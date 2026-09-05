// Cliente de Supabase para el SERVIDOR (Server Components y Route Handlers).
// Lee/escribe la sesión desde las cookies del request. Usa la publishable key:
// las acciones siguen limitadas por RLS al usuario dueño de la sesión.
// Para operaciones que deben saltarse RLS (webhook de pago, tareas internas)
// se usa lib/supabase/admin.ts, NUNCA este cliente.

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function createClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY en el entorno del servidor.'
    );
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // En un Server Component esto puede lanzar (no se pueden escribir
        // cookies al renderizar). Es seguro ignorarlo: el refresh de la sesión
        // lo hace el proxy.ts en cada request. En Route Handlers sí escribe.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          /* Server Component: lo cubre proxy.ts */
        }
      },
    },
  });
}
