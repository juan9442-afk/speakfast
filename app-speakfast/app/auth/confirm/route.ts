// Destino del enlace del correo de acceso. Acepta los dos formatos:
//  - token_hash + type  (plantilla de correo personalizada — funciona aunque el
//    enlace se abra en OTRO navegador o dispositivo)
//  - code               (flujo PKCE por defecto — solo mismo navegador)
// Verifica y crea la sesión (cookies), luego redirige a la app.
// El código de 6 dígitos se verifica aparte, en /entrar.

import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = (searchParams.get('type') as EmailOtpType | null) ?? 'email';
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/app';

  const supabase = await createClient();

  if (token_hash) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  }

  // Enlace inválido, expirado, o abierto en otro navegador (usa el código).
  return NextResponse.redirect(new URL('/entrar?error=enlace', request.url));
}
