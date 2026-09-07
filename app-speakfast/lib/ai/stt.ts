import 'server-only';

// Transcripción de la respuesta hablada (voz → texto). OpenAI. El audio se
// transcribe y NO se guarda (regla nunca #1 de ESTADO.md: la voz se borra).

import OpenAI, { toFile } from 'openai';
import { callWithRetry } from './retry';
import { registrarLlamada } from './budget';

const MODEL = process.env.STT_MODEL || 'gpt-4o-transcribe';
const PRECIO_POR_MIN = 0.006; // gpt-4o-transcribe (verificar vigente)

function client() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('Falta OPENAI_API_KEY (entorno del servidor / Vercel).');
  return new OpenAI({ apiKey: key });
}

export async function transcribir(
  audio: ArrayBuffer,
  filename: string,
  segundos: number,
  userId: string | null
): Promise<string> {
  const c = client();
  const file = await toFile(Buffer.from(audio), filename);
  const res = await callWithRetry(() =>
    c.audio.transcriptions.create({ file, model: MODEL, language: 'en' })
  );
  void registrarLlamada({
    userId,
    kind: 'stt',
    model: MODEL,
    costUsd: (Math.max(segundos, 1) / 60) * PRECIO_POR_MIN,
  });
  return (res.text ?? '').trim();
}
