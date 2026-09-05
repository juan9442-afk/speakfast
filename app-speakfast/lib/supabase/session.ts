// Refresco de la sesión de Supabase en cada request. Lo llama proxy.ts.
// Sin esto, el access token (vida ~1h) expira y el usuario "se desloguea solo".
// Patrón canónico de @supabase/ssr — copiar tal cual, no "optimizar".
// Ver 26-AUTH-MODERNO.md → "MIDDLEWARE CANÓNICO DE SUPABASE SSR".

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Modelo onboarding-first anónimo (ver ESTADO.md → Estrategia de monetización):
// todo el funnel de venta es PÚBLICO. Solo /app y las API privadas exigen sesión.
const PUBLIC_PATHS = [
  '/',
  '/onboarding',
  '/paywall',
  '/entrar',
  '/auth',
  '/terminos',
  '/privacidad',
  '/reembolsos',
  '/aviso-ia',
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Sin credenciales configuradas todavía: no rompemos la navegación pública
  // (landing/onboarding/paywall funcionan sin login). Solo /app queda fuera.
  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // NO poner lógica entre createServerClient y getUser(): getUser() valida el
  // JWT contra Supabase y dispara el refresh si el token expiró.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some(
    (p) => path === p || (p !== '/' && path.startsWith(p + '/'))
  );

  if (!user && !isPublic) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/entrar';
    return NextResponse.redirect(redirectUrl);
  }

  // Devolver supabaseResponse TAL CUAL: contiene las cookies refrescadas.
  return supabaseResponse;
}
