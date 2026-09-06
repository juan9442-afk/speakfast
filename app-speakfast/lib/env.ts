// Validación fail-closed de variables de entorno (51 §6 / 09).
// No revienta el build (se valida en la primera llamada, no al importar), pero
// la primera vez que el servidor necesita un secreto y falta, lanza un error
// claro en vez de correr con un valor de juguete.

import { z } from 'zod';

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(10),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const serverSchema = z.object({
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SECRET_KEY: z.string().min(10),
});

let publicCache: z.infer<typeof publicSchema> | null = null;
let serverCache: z.infer<typeof serverSchema> | null = null;

function fail(prefix: string, err: z.ZodError): never {
  const faltan = err.issues.map((i) => i.path.join('.')).join(', ');
  throw new Error(
    `${prefix}: revisa estas variables de entorno (en .env.local y en Vercel): ${faltan}`
  );
}

/** Variables públicas (cliente y servidor). Seguras de exponer. */
export function publicEnv() {
  if (publicCache) return publicCache;
  const r = publicSchema.safeParse(process.env);
  if (!r.success) fail('Config pública incompleta', r.error);
  publicCache = r.data;
  return publicCache;
}

/** Variables secretas. SOLO servidor — nunca importar desde un componente cliente. */
export function serverEnv() {
  if (serverCache) return serverCache;
  const r = serverSchema.safeParse(process.env);
  if (!r.success) fail('Config de servidor incompleta', r.error);
  serverCache = r.data;
  return serverCache;
}
