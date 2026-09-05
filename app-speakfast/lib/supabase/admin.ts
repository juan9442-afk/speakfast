import 'server-only';

// Cliente ADMIN de Supabase — usa la SECRET key y SE SALTA RLS.
// SOLO servidor, SOLO para: webhook de Hotmart (crear/actualizar plan),
// mutaciones de racha/XP/Índice de Preparación por RPC estrecha, y tareas
// internas. JAMÁS se importa desde un componente 'use client'.
// Ver 09-SEGURIDAD.md y 25-BASE-DE-DATOS.md.

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secret) {
    throw new Error(
      'Faltan SUPABASE_URL o SUPABASE_SECRET_KEY. La secret key va SOLO en el ' +
        'entorno del servidor (sin prefijo NEXT_PUBLIC_), nunca en el navegador.'
    );
  }

  return createSupabaseClient(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
