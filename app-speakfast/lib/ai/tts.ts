import 'server-only';

// Voz de "Sarah" (texto → audio). OpenAI. CACHEA el audio idéntico (30 §AUDIO):
// mismo texto + misma voz = mismo mp3 → se genera UNA vez y se guarda en el
// bucket `tts-cache` de Supabase Storage; la 2ª vez cuesta $0.

import { createHash } from 'crypto';
import OpenAI from 'openai';
import { callWithRetry } from './retry';
import { registrarLlamada } from './budget';
import { createAdminClient } from '@/lib/supabase/admin';

const MODEL = process.env.TTS_MODEL || 'gpt-4o-mini-tts';
const VOICE = process.env.TTS_VOICE || 'shimmer'; // voz femenina, tono entrevistadora
const BUCKET = 'tts-cache';
const PRECIO_POR_1K_CHARS = 0.015; // gpt-4o-mini-tts (verificar vigente)

function client() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('Falta OPENAI_API_KEY (entorno del servidor / Vercel).');
  return new OpenAI({ apiKey: key });
}

function hash(text: string) {
  return createHash('sha256').update(`${MODEL}|${VOICE}|${text}`).digest('hex');
}

/** Devuelve el mp3 de `text` con la voz de Sarah. Usa caché en Storage. */
export async function vozDeSarah(text: string, userId: string | null): Promise<Buffer> {
  const admin = createAdminClient();
  const key = `${hash(text)}.mp3`;

  const cached = await admin.storage.from(BUCKET).download(key);
  if (cached.data) {
    return Buffer.from(await cached.data.arrayBuffer());
  }

  const c = client();
  const res = await callWithRetry(() =>
    c.audio.speech.create({ model: MODEL, voice: VOICE, input: text, response_format: 'mp3' })
  );
  const buf = Buffer.from(await res.arrayBuffer());

  void registrarLlamada({
    userId,
    kind: 'tts',
    model: MODEL,
    costUsd: (text.length / 1000) * PRECIO_POR_1K_CHARS,
  });

  // Guardar en caché (si el bucket no existe, no rompe la respuesta al usuario).
  void admin.storage.from(BUCKET).upload(key, buf, { contentType: 'audio/mpeg', upsert: true });

  return buf;
}
