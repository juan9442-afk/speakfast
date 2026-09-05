-- SpeakFast — esquema inicial (Sesión 6)
-- Modelo de datos de ESTADO.md → "Decisiones técnicas → Modelo de datos".
-- RLS activo en TODAS las tablas. Política canónica de 25/26:
--   for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)
-- Columna de la política SIEMPRE indexada.
-- Las tablas de progreso/racha/eventos: el cliente solo LEE; las mutaciones
-- corren server-side con la secret key (que se salta RLS) — por eso no llevan
-- policy de INSERT/UPDATE/DELETE.

-- ───────────────────────── profiles ─────────────────────────
create table public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  plan               text not null default 'free'
                       check (plan in ('free','trialing','active','canceled')),
  trial_ends_at      timestamptz,
  role_category      text,
  role_specific      text,
  salary_target      text,
  interview_timing   text,
  training_intensity text check (training_intensity in ('ligero','estandar','intensivo')),
  pain_points        jsonb not null default '[]'::jsonb,
  created_at         timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using ((select auth.uid()) = id);
-- El plan/trial los fija el webhook de Hotmart con la secret key, no el cliente.

-- ───────────────────────── user_settings ─────────────────────
create table public.user_settings (
  user_id         uuid primary key references auth.users(id) on delete cascade,
  voice_enabled   boolean not null default true,
  email_reminders boolean not null default true,
  daily_goal      text not null default 'estandar'
                    check (daily_goal in ('ligero','estandar','intensivo')),
  tz              text not null default 'America/Bogota',
  updated_at      timestamptz not null default now()
);
alter table public.user_settings enable row level security;

create policy "user_settings_rw_own" on public.user_settings
  for all using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ───────────────────────── user_progress ─────────────────────
create table public.user_progress (
  user_id         uuid primary key references auth.users(id) on delete cascade,
  xp_total        integer not null default 0,
  current_streak  integer not null default 0,
  longest_streak  integer not null default 0,
  last_active_on  date,
  freezes         integer not null default 0,
  readiness_score integer not null default 0
                    check (readiness_score between 0 and 100),
  updated_at      timestamptz not null default now()
);
alter table public.user_progress enable row level security;

create policy "user_progress_select_own" on public.user_progress
  for select using ((select auth.uid()) = user_id);

-- ───────────────────────── questions (contenido) ─────────────
create table public.questions (
  id            uuid primary key default gen_random_uuid(),
  role_category text not null,
  role_specific text[] not null default '{}',
  text_en       text not null,
  difficulty    integer not null default 2 check (difficulty between 1 and 5),
  category      text not null default 'behavioral'
                  check (category in ('behavioral','technical','hr')),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);
alter table public.questions enable row level security;

create policy "questions_select_authenticated" on public.questions
  for select to authenticated using (is_active);

create index questions_role_category_idx on public.questions (role_category);

-- ───────────────────────── interview_sessions ───────────────
create table public.interview_sessions (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  role_category  text,
  started_at     timestamptz not null default now(),
  finished_at    timestamptz,
  question_count integer not null default 0,
  avg_fluency    integer,
  cheatsheet     jsonb
);
alter table public.interview_sessions enable row level security;

create policy "interview_sessions_select_own" on public.interview_sessions
  for select using ((select auth.uid()) = user_id);

create index interview_sessions_user_idx on public.interview_sessions (user_id);

-- ───────────────────────── practice_runs ────────────────────
create table public.practice_runs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  session_id       uuid references public.interview_sessions(id) on delete cascade,
  question_id      uuid references public.questions(id) on delete set null,
  order_in_session integer not null default 1,
  status           text not null default 'pending'
                     check (status in ('pending','processing','done','failed')),
  transcript         text,
  fluency_score      integer,
  filler_words       jsonb not null default '[]'::jsonb,
  wpm                integer,
  clarity_score      integer,
  translation_pause_s numeric(4,1),
  words_to_fix       jsonb not null default '[]'::jsonb,
  optimized_answer   text,
  idempotency_key    text not null unique,
  created_at         timestamptz not null default now()
);
alter table public.practice_runs enable row level security;

create policy "practice_runs_select_own" on public.practice_runs
  for select using ((select auth.uid()) = user_id);

create index practice_runs_user_idx on public.practice_runs (user_id);
create index practice_runs_session_idx on public.practice_runs (session_id);

-- ───────────────────────── vocab_upgrades ───────────────────
create table public.vocab_upgrades (
  user_id           uuid not null references auth.users(id) on delete cascade,
  phrase_basic      text not null,
  phrase_pro        text not null,
  source_session_id uuid references public.interview_sessions(id) on delete set null,
  created_at        timestamptz not null default now(),
  primary key (user_id, phrase_basic)
);
alter table public.vocab_upgrades enable row level security;

create policy "vocab_upgrades_select_own" on public.vocab_upgrades
  for select using ((select auth.uid()) = user_id);

-- ───────────────────────── question_mastery ─────────────────
create table public.question_mastery (
  user_id        uuid not null references auth.users(id) on delete cascade,
  question_id    uuid not null references public.questions(id) on delete cascade,
  state          text not null default 'unpracticed'
                   check (state in ('unpracticed','in_progress','mastered')),
  best_fluency   integer not null default 0,
  practice_count integer not null default 0,
  updated_at     timestamptz not null default now(),
  primary key (user_id, question_id)
);
alter table public.question_mastery enable row level security;

create policy "question_mastery_select_own" on public.question_mastery
  for select using ((select auth.uid()) = user_id);

-- ───────────────────────── event_log (solo servidor) ────────
create table public.event_log (
  id         bigint generated always as identity primary key,
  user_id    uuid references auth.users(id) on delete set null,
  event      text not null,
  payload    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.event_log enable row level security;
-- Sin policy: el cliente no lo lee ni escribe. Lo maneja el servidor y el backoffice.

create index event_log_user_idx on public.event_log (user_id);
create index event_log_event_idx on public.event_log (event);

-- ───────────────────────── ai_calls (kill-switch, solo servidor) ─
create table public.ai_calls (
  id          bigint generated always as identity primary key,
  user_id     uuid references auth.users(id) on delete set null,
  kind        text not null,          -- stt | llm | tts | cheatsheet
  model       text,
  cost_usd    numeric(8,4) not null default 0,
  created_at  timestamptz not null default now()
);
alter table public.ai_calls enable row level security;
-- Sin policy: solo servidor.

create index ai_calls_created_idx on public.ai_calls (created_at);

-- ───────────────────────── alta automática de usuario ───────
-- Al crear un usuario en auth.users, se crean sus filas base.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  insert into public.user_settings (user_id) values (new.id) on conflict do nothing;
  insert into public.user_progress (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
