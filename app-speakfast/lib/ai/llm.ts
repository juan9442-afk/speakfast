import 'server-only';

// Análisis de respuestas + chuleta + repreguntas. Anthropic Claude Haiku (barato,
// tier de extracción/clasificación — 30 §MODEL TIERING). Salida estructurada por
// TOOL USE forzado + zod + reintento que REINYECTA el error (30 §SALIDA
// ESTRUCTURADA). El texto del usuario es DATOS, va en su propio bloque, nunca
// dentro de las instrucciones (30 §GUARDRAILS anti-inyección).

import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { callWithRetry, aiBreaker } from './retry';
import { registrarLlamada } from './budget';

const MODEL = process.env.AI_MODEL || 'claude-haiku-4-5-20251001';
// Haiku ≈ $1 / $5 por 1M tokens in/out (30, verificar vigente).
const PRECIO_IN = 1 / 1_000_000;
const PRECIO_OUT = 5 / 1_000_000;

function client() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('Falta ANTHROPIC_API_KEY (va en el entorno del servidor / Vercel).');
  return new Anthropic({ apiKey: key });
}

// ── Análisis de UNA respuesta ────────────────────────────────────────────────
export const AnalisisSchema = z.object({
  fluency_score: z.number().int().min(0).max(100),
  clarity_score: z.number().int().min(0).max(100),
  wpm: z.number().int().min(0).max(400),
  translation_pause_s: z.number().min(0).max(30),
  filler_words: z.array(z.string().max(20)).max(30),
  words_to_fix: z
    .array(z.object({ basic: z.string().max(120), pro: z.string().max(200) }))
    .max(8),
  optimized_answer: z.string().max(1500),
});
export type Analisis = z.infer<typeof AnalisisSchema>;

const analisisTool: Anthropic.Tool = {
  name: 'report_analysis',
  description: 'Reporta el análisis de fluidez de la respuesta hablada del candidato.',
  input_schema: {
    type: 'object',
    properties: {
      fluency_score: { type: 'integer', minimum: 0, maximum: 100 },
      clarity_score: { type: 'integer', minimum: 0, maximum: 100 },
      wpm: { type: 'integer', minimum: 0, maximum: 400 },
      translation_pause_s: { type: 'number', minimum: 0, maximum: 30 },
      filler_words: { type: 'array', items: { type: 'string' } },
      words_to_fix: {
        type: 'array',
        items: {
          type: 'object',
          properties: { basic: { type: 'string' }, pro: { type: 'string' } },
          required: ['basic', 'pro'],
          additionalProperties: false,
        },
      },
      optimized_answer: { type: 'string' },
    },
    required: [
      'fluency_score',
      'clarity_score',
      'wpm',
      'translation_pause_s',
      'filler_words',
      'words_to_fix',
      'optimized_answer',
    ],
    additionalProperties: false,
  },
};

const SYSTEM_ANALISIS = `Eres un coach de entrevistas en inglés para profesionales de LATAM.
Recibes la transcripción de una respuesta HABLADA (con muletillas y titubeos tal cual se dijeron)
y la pregunta que se respondía. Devuelve SOLO la tool report_analysis con:
- fluency_score / clarity_score: 0-100, exigente pero justo.
- wpm: palabras por minuto estimadas (ritmo natural de entrevista ~120-160).
- translation_pause_s: segundos estimados que el candidato pasó "traduciendo en la cabeza"
  (pausas largas, reinicios). 0 si fluyó.
- filler_words: las muletillas EXACTAS que usó ("um", "like", "you know", "eh"...), con repetición.
- words_to_fix: 1-5 mejoras de vocabulario { basic: lo que dijo, pro: cómo suena un senior }.
- optimized_answer: la MISMA respuesta reescrita natural y profesional, en inglés, misma longitud aprox.
No inventes datos que no estén en la transcripción. Responde en inglés SOLO dentro de optimized_answer
y words_to_fix; el resto son números o listas.`;

async function llamarTool<T>(
  system: string,
  userBlocks: string,
  tool: Anthropic.Tool,
  schema: z.ZodType<T>,
  kind: 'llm' | 'cheatsheet',
  userId: string | null,
  maxRetries = 2
): Promise<T> {
  const messages: Anthropic.MessageParam[] = [{ role: 'user', content: userBlocks }];
  const c = client();

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await aiBreaker.exec(() =>
      callWithRetry(() =>
        c.messages.create({
          model: MODEL,
          max_tokens: 1500,
          system,
          tools: [tool],
          tool_choice: { type: 'tool', name: tool.name },
          messages,
        })
      )
    );

    void registrarLlamada({
      userId,
      kind,
      model: MODEL,
      costUsd: res.usage.input_tokens * PRECIO_IN + res.usage.output_tokens * PRECIO_OUT,
    });

    const toolUse = res.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
    );
    const parsed = schema.safeParse(toolUse?.input);
    if (parsed.success) return parsed.data;

    // Reinyectar el error de validación para que se auto-corrija (no reintento ciego).
    messages.push({ role: 'assistant', content: res.content });
    messages.push({
      role: 'user',
      content: `La salida no validó: ${parsed.error.message}. Corrige y vuelve a llamar la tool.`,
    });
  }
  throw new Error('La IA no devolvió un análisis válido tras los reintentos.');
}

export function analizarRespuesta(
  pregunta: string,
  transcripcion: string,
  segundos: number,
  userId: string | null
): Promise<Analisis> {
  const blocks = `<pregunta>\n${pregunta}\n</pregunta>\n<duracion_segundos>${Math.round(
    segundos
  )}</duracion_segundos>\n<transcripcion_hablada>\n${transcripcion}\n</transcripcion_hablada>`;
  return llamarTool(SYSTEM_ANALISIS, blocks, analisisTool, AnalisisSchema, 'llm', userId);
}

// ── Chuleta al cerrar la entrevista ─────────────────────────────────────────
export const ChuletaSchema = z.object({
  bridge_phrases: z.array(z.string().max(160)).min(4).max(8),
  vocab_upgrades: z
    .array(z.object({ basic: z.string().max(120), pro: z.string().max(200) }))
    .max(10),
  model_answers: z
    .array(z.object({ question: z.string().max(300), answer: z.string().max(1200) }))
    .max(6),
});
export type Chuleta = z.infer<typeof ChuletaSchema>;

const chuletaTool: Anthropic.Tool = {
  name: 'report_cheatsheet',
  description: 'Arma la chuleta que el candidato abre 5 minutos antes de la entrevista real.',
  input_schema: {
    type: 'object',
    properties: {
      bridge_phrases: { type: 'array', items: { type: 'string' } },
      vocab_upgrades: {
        type: 'array',
        items: {
          type: 'object',
          properties: { basic: { type: 'string' }, pro: { type: 'string' } },
          required: ['basic', 'pro'],
          additionalProperties: false,
        },
      },
      model_answers: {
        type: 'array',
        items: {
          type: 'object',
          properties: { question: { type: 'string' }, answer: { type: 'string' } },
          required: ['question', 'answer'],
          additionalProperties: false,
        },
      },
    },
    required: ['bridge_phrases', 'vocab_upgrades', 'model_answers'],
    additionalProperties: false,
  },
};

const SYSTEM_CHULETA = `Eres un coach de entrevistas en inglés. Recibes las preguntas y las
transcripciones de toda una entrevista de práctica. Devuelve SOLO la tool report_cheatsheet:
- bridge_phrases: 6-8 frases en inglés para NO congelarse, elegidas según dónde el candidato tuvo
  pausas o muletillas ("Let me give you some context first...", "The short answer is X, here's why...").
- vocab_upgrades: sus mejoras de vocabulario más útiles { basic, pro }.
- model_answers: para 3-4 preguntas clave, una respuesta modelo en inglés, natural y de nivel senior.
Todo el contenido de valor en inglés. No inventes experiencia que el candidato no mencionó.`;

export function generarChuleta(
  turnos: { pregunta: string; transcripcion: string }[],
  userId: string | null
): Promise<Chuleta> {
  const blocks =
    '<entrevista>\n' +
    turnos
      .map(
        (t, i) =>
          `<turno n="${i + 1}">\n<pregunta>${t.pregunta}</pregunta>\n<respuesta>${t.transcripcion}</respuesta>\n</turno>`
      )
      .join('\n') +
    '\n</entrevista>';
  return llamarTool(SYSTEM_CHULETA, blocks, chuletaTool, ChuletaSchema, 'cheatsheet', userId);
}

// ── Repregunta encadenada ──────────────────────────────────────────────────
export async function siguientePregunta(
  rol: string,
  turnos: { pregunta: string; transcripcion: string }[],
  userId: string | null
): Promise<string> {
  const c = client();
  const res = await aiBreaker.exec(() =>
    callWithRetry(() =>
      c.messages.create({
        model: MODEL,
        max_tokens: 120,
        system: `Eres "Sarah", entrevistadora de RR. HH. Haces UNA sola repregunta de seguimiento en
inglés, natural y breve (máx 25 palabras), sobre lo último que dijo el candidato para un puesto de ${rol}.
Devuelve SOLO la pregunta, sin comillas ni preámbulo.`,
        messages: [
          {
            role: 'user',
            content:
              turnos
                .map((t) => `Q: ${t.pregunta}\nA: ${t.transcripcion}`)
                .join('\n\n') + '\n\nNext follow-up question:',
          },
        ],
      })
    )
  );
  void registrarLlamada({
    userId,
    kind: 'llm',
    model: MODEL,
    costUsd: res.usage.input_tokens * PRECIO_IN + res.usage.output_tokens * PRECIO_OUT,
  });
  const txt = res.content.find((b): b is Anthropic.TextBlock => b.type === 'text')?.text ?? '';
  return txt.trim().replace(/^["']|["']$/g, '');
}
