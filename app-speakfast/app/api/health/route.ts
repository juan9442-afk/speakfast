// Chequeo de salud: dice qué está configurado SIN revelar ningún valor.
// Útil para verificar que Vercel cargó las variables de entorno correctas.
// GET /api/health

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  const has = (v: string | undefined) => typeof v === 'string' && v.length > 0;

  return NextResponse.json({
    ok: true,
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? 'local',
    configured: {
      supabase_url: has(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabase_publishable_key: has(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
      supabase_secret_key: has(process.env.SUPABASE_SECRET_KEY),
      ai_key: has(process.env.ANTHROPIC_API_KEY),
      resend_key: has(process.env.RESEND_API_KEY),
      hotmart_hottok: has(process.env.HOTMART_HOTTOK),
    },
  });
}
