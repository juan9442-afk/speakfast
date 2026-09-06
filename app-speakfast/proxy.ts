// proxy.ts — en Next 16 el antiguo "middleware" se llama "proxy". Corre en el
// servidor antes de cada request. Aquí solo refresca la sesión de Supabase y
// protege /app. Ver lib/supabase/session.ts.

import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/session';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Todo excepto:
    //  - /api/*  → las rutas de servidor validan su propia sesión (patrón BFF de 09);
    //    además /api/health debe ser público. El proxy solo protege PÁGINAS.
    //  - estáticos, imágenes y los metadata files (robots/sitemap/favicon/icon) →
    //    si el proxy los toca, un visitante anónimo los ve redirigidos a /entrar.
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
