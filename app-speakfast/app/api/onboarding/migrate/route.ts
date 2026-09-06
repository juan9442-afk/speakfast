// Migra el estado anónimo del onboarding (localStorage) a la cuenta, al primer
// login. Input NO confiable → se valida con zod. Idempotente: se puede llamar
// varias veces sin efecto extra. Ver 26 §"usuario anónimo → cuenta".

import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const schema = z.object({
  profesion: z.string().max(40).nullable().optional(),
  rol: z.string().max(80).optional(),
  meta: z.string().max(20).nullable().optional(),
  timing: z.string().max(20).nullable().optional(),
  dolores: z.array(z.string().max(40)).max(12).optional(),
  intensidad: z.enum(['ligero', 'estandar', 'intensivo']).nullable().optional(),
  indicePreparacion: z.number().int().min(0).max(100).optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'no autenticado' }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'json inválido' }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'datos inválidos' }, { status: 422 });
  }
  const d = parsed.data;

  // Escrituras server-side scoped al usuario de la sesión (admin salta RLS pero
  // SIEMPRE con .eq(...user.id)). profiles/user_progress no son editables por el
  // cliente a propósito (24).
  const admin = createAdminClient();

  await admin
    .from('profiles')
    .update({
      role_category: d.profesion ?? null,
      role_specific: d.rol ?? null,
      salary_target: d.meta ?? null,
      interview_timing: d.timing ?? null,
      training_intensity: d.intensidad ?? null,
      pain_points: d.dolores ?? [],
    })
    .eq('id', user.id);

  if (d.intensidad) {
    await admin.from('user_settings').update({ daily_goal: d.intensidad }).eq('user_id', user.id);
  }

  if (typeof d.indicePreparacion === 'number') {
    await admin
      .from('user_progress')
      .update({ readiness_score: d.indicePreparacion })
      .eq('user_id', user.id);
  }

  return NextResponse.json({ ok: true });
}
