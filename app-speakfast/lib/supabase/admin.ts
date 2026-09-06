import 'server-only';

// Cliente ADMIN de Supabase — usa la SECRET key y SE SALTA RLS.
// SOLO servidor, SOLO para: webhook de Hotmart (crear/actualizar plan),
// mutaciones de racha/XP/Índice de Preparación por RPC estrecha, y tareas
// internas. JAMÁS se importa desde un componente 'use client'.
// Ver 09-SEGURIDAD.md y 25-BASE-DE-DATOS.md.

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { publicEnv, serverEnv } from '@/lib/env';

export function createAdminClient() {
  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = serverEnv();
  const url = SUPABASE_URL ?? publicEnv().NEXT_PUBLIC_SUPABASE_URL;

  return createSupabaseClient(url, SUPABASE_SECRET_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
