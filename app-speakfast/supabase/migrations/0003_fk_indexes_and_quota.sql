-- Capa 1 de la auditoría (2026-09-05): índices de cobertura + límite diario atómico.

-- ── Índices de cobertura para FKs sin índice (advisor de Supabase) ──
create index if not exists ai_calls_user_idx           on public.ai_calls (user_id);
create index if not exists practice_runs_question_idx   on public.practice_runs (question_id);
create index if not exists question_mastery_question_idx on public.question_mastery (question_id);
create index if not exists vocab_upgrades_source_idx     on public.vocab_upgrades (source_session_id);

-- ── Uso diario: contador atómico por usuario y día ──
create table if not exists public.daily_usage (
  user_id            uuid not null references auth.users(id) on delete cascade,
  day                date not null,
  interviews_started integer not null default 0,
  primary key (user_id, day)
);
alter table public.daily_usage enable row level security;

create policy "daily_usage_select_own" on public.daily_usage
  for select using ((select auth.uid()) = user_id);
-- Las escrituras solo por la RPC de abajo (security definer), nunca directas.

-- ── begin_interview(): reserva un cupo de entrevista de HOY de forma ATÓMICA.
-- Devuelve el nº de entrevistas ya empezadas hoy (incluida esta) si hay cupo,
-- o NULL si el usuario llegó al límite de su plan. No cuenta con "SELECT→JS→INSERT".
create or replace function public.begin_interview(p_tz text default 'UTC')
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user  uuid := (select auth.uid());
  v_plan  text;
  v_limit integer;
  v_day   date := (now() at time zone coalesce(p_tz, 'UTC'))::date;
  v_count integer;
begin
  if v_user is null then
    raise exception 'no autenticado';
  end if;

  select plan into v_plan from public.profiles where id = v_user;
  v_limit := case v_plan
    when 'trialing' then 3
    when 'active'   then 10   -- fair-use
    else 0                    -- free / canceled: sin entrevistas
  end;

  if v_limit < 1 then
    return null;  -- plan sin entrevistas: ni siquiera se crea la fila
  end if;

  insert into public.daily_usage (user_id, day, interviews_started)
  values (v_user, v_day, 1)
  on conflict (user_id, day) do update
    set interviews_started = public.daily_usage.interviews_started + 1
    where public.daily_usage.interviews_started < v_limit
  returning interviews_started into v_count;

  return v_count;  -- NULL si el ON CONFLICT no actualizó (límite alcanzado)
end;
$$;

revoke execute on function public.begin_interview(text) from anon, public;
grant  execute on function public.begin_interview(text) to authenticated;
