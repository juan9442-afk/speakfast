// Destino del enlace del correo de acceso. Supabase manda al usuario aquí con
// ?token_hash=...&type=email; lo verificamos y creamos la sesión (cookies), y
// redirigimos a la app. El código de 6 dígitos se verifica en /entrar mismo.
// Ver 26-AUTH-MODERNO.md → "OAuth, Magic Links y OTP".

import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/app';

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Enlace inválido o expirado: de vuelta al login con un aviso.
  return NextResponse.redirect(new URL('/entrar?error=enlace', request.url));
}
