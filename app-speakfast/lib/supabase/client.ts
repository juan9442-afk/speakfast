// Cliente de Supabase para el NAVEGADOR (componentes 'use client').
// Usa la publishable key: es pública por diseño — la protección real de los
// datos es RLS (las reglas de seguridad por fila que viven en la base de datos).
// Ver 26-AUTH-MODERNO.md y 51-STACK-PINEADO.md §5.

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. ' +
        'Cópialas de Supabase → Project Settings → API Keys a tu .env.local (y a Vercel).'
    );
  }

  return createBrowserClient(url, key);
}
