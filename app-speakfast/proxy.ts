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
    // Todo excepto estáticos e imágenes — que el refresh no corra por cada asset.
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
