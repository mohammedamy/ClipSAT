-- ClipSAT Cloud Sync — Supabase schema
-- ════════════════════════════════════════════════════════════════════════
-- Run this ONCE, in your Supabase project's SQL editor (Dashboard →
-- SQL Editor → New query → paste this whole file → Run). See
-- SUPABASE_SETUP.md for the step-by-step walkthrough.
--
-- This mirrors ClipSAT's EXISTING localStorage progress keys 1:1, so
-- syncing is lossless — see public/js/cloud-sync.js for the client side
-- that reads/writes these tables.
--   clipsat_mistakes_v2  → public.mistakes
--   clipsat_srs_state    → public.srs_state
--   clipsat_visited      → public.chapter_visits
--   clipsat_accuracy_v1  → public.accuracy
--   xp / streak / daily goal / exam date → public.profiles

-- ── profiles: one row per user, the scalar progress fields ────────────────
create table if not exists public.profiles (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  xp             integer not null default 0,
  streak         integer not null default 0,
  daily_goal     integer not null default 10,
  dg_today       integer not null default 0,
  dg_today_date  date,
  dg_streak      integer not null default 0,
  exam_date      date,
  updated_at     timestamptz not null default now()
);

-- ── mistakes: mirrors window.ML's clipsat_mistakes_v2 array, one row/entry ─
-- Note: "right" and "interval" are both reserved words in PostgreSQL and
-- error as bare column names (42601 syntax error) — renamed to `correct`
-- and `interval_days`. See public/js/cloud-sync.js for the field mapping.
create table if not exists public.mistakes (
  user_id       uuid not null references auth.users(id) on delete cascade,
  id            text not null,              -- ML entry id, e.g. "q-<timestamp>"
  view_id       text default '',
  q             text default '',
  wrong         text default '',
  correct       text default '',
  domain        text default '',
  src           text default '',
  ts            bigint not null,            -- ms epoch, matches Date.now() on the client
  reviewed_at   bigint default 0,
  ease_factor   real default 2.5,
  interval_days integer default 1,
  next_review   bigint,
  deleted_at    timestamptz default null,
  updated_at    timestamptz not null default now(),
  primary key (user_id, id)
);

-- ── srs_state: mirrors the flashcard SM-2-lite schedule (clipsat_srs_state) ─
create table if not exists public.srs_state (
  user_id       uuid not null references auth.users(id) on delete cascade,
  card_id       text not null,              -- "<track>:<slugified-front-text>"
  due           bigint,                     -- ms epoch of next review
  interval_days integer,
  updated_at    timestamptz not null default now(),
  primary key (user_id, card_id)
);

-- ── chapter_visits: mirrors clipsat_visited (per-track visit counts) ──────
create table if not exists public.chapter_visits (
  user_id    uuid not null references auth.users(id) on delete cascade,
  track      text not null,
  count      integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);

-- ── accuracy: mirrors clipsat_accuracy_v1 (right+wrong attempt counts,
--    bucketed by track/domain/day — feeds the mastery heatmap + accuracy
--    trend in the Progress modal; Pillar 3 MVP). One row per bucket, not
--    one row per attempt, so this stays small even for a very active user.
create table if not exists public.accuracy (
  user_id    uuid not null references auth.users(id) on delete cascade,
  track      text not null,
  domain     text not null,
  day        date not null,
  correct    integer not null default 0,
  total      integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, track, domain, day)
);

-- ── Row Level Security: every table is only readable/writable by its owner ─
-- This is the entire access-control story — the anon key in cloud-config.js
-- is public by design; it can only ever touch rows where auth.uid() matches.
alter table public.profiles       enable row level security;
alter table public.mistakes       enable row level security;
alter table public.srs_state      enable row level security;
alter table public.chapter_visits enable row level security;
alter table public.accuracy       enable row level security;

drop policy if exists "own profile"        on public.profiles;
drop policy if exists "own mistakes"       on public.mistakes;
drop policy if exists "own srs state"      on public.srs_state;
drop policy if exists "own chapter visits" on public.chapter_visits;
drop policy if exists "own accuracy"       on public.accuracy;

create policy "own profile"        on public.profiles       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own mistakes"       on public.mistakes       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own srs state"      on public.srs_state      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own chapter visits" on public.chapter_visits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own accuracy"       on public.accuracy       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Auto-create an empty profile row the moment someone signs up ──────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Teacher/parent view (Pillar 3 MVP: "assign … see aggregate mastery") ──
-- Simple class-code model, no separate "teacher" role: creating a class
-- makes you its owner for that class; any signed-in user can own classes,
-- join others, or both. See public/js/teacher-view.js for the client side.
--
--   classes       — one row per class, owned by the teacher who created it
--   class_members — join table; a student joins by entering the class code
--
-- Privacy: the student is always in control. Joining is opt-in (a code
-- they were given, never auto-shared), display_name is per-class and
-- optional (defaults to null — a teacher sees an anonymous roster row
-- until the student chooses to identify themselves), and leaving a class
-- (deleting your own class_members row) immediately cuts off the
-- teacher's read policy below — there is no separate revoke step to
-- forget. A teacher only ever gets read-only aggregate access to a
-- roster member's accuracy/mistakes/chapter_visits/profile — never write,
-- and never to students who haven't joined with their code.
create table if not exists public.classes (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references auth.users(id) on delete cascade,
  name       text not null,
  code       text not null unique,
  track      text default null,
  created_at timestamptz not null default now()
);

create table if not exists public.class_members (
  class_id      uuid not null references public.classes(id) on delete cascade,
  student_id    uuid not null references auth.users(id) on delete cascade,
  display_name  text,
  consent_given boolean not null default true,
  consent_at    timestamptz not null default now(),
  joined_at     timestamptz not null default now(),
  primary key (class_id, student_id)
);

create table if not exists public.class_join_attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  attempted_at timestamptz not null default now()
);
create index if not exists idx_class_join_attempts_user_time
  on public.class_join_attempts (user_id, attempted_at desc);

alter table public.classes             enable row level security;
alter table public.class_members       enable row level security;
alter table public.class_join_attempts enable row level security;

drop policy if exists "own classes"        on public.classes;
drop policy if exists "enrolled students see joined classes" on public.classes;
drop policy if exists "own membership"     on public.class_members;
drop policy if exists "leave class"        on public.class_members;
drop policy if exists "teacher sees roster" on public.class_members;
drop policy if exists "teacher removes member" on public.class_members;

-- Zero-recursion helper so enrolled students can read joined class metadata & assignments
create or replace function public.is_enrolled_in_class(p_class_id uuid)
returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.class_members cm
     where cm.class_id = p_class_id and cm.student_id = auth.uid()
  );
$$;
revoke all on function public.is_enrolled_in_class(uuid) from public, anon;
grant execute on function public.is_enrolled_in_class(uuid) to authenticated, service_role;

-- Teacher manages their own classes (create/rename/delete/see the code)
create policy "own classes" on public.classes for all
  using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
-- Enrolled students can read metadata of classes they joined (enables class name + assignments join)
create policy "enrolled students see joined classes" on public.classes for select
  to authenticated using (public.is_enrolled_in_class(id));

-- A student sees and can leave their own membership row
create policy "own membership" on public.class_members for select using (auth.uid() = student_id);
create policy "leave class"    on public.class_members for delete using (auth.uid() = student_id);
-- The teacher sees (and can remove) rows in classes they own
create policy "teacher sees roster" on public.class_members for select using (
  exists (select 1 from public.classes c where c.id = class_id and c.owner_id = auth.uid())
);
create policy "teacher removes member" on public.class_members for delete using (
  exists (select 1 from public.classes c where c.id = class_id and c.owner_id = auth.uid())
);

-- Joining goes through this function only — never a direct table write.
-- Rate-limited to max 8 attempts per 15 minutes per user and requires explicit consent.
drop function if exists public.join_class_by_code(text, text);
create or replace function public.join_class_by_code(
  p_code         text,
  p_display_name text default null,
  p_consent      boolean default true
)
returns table(class_id uuid, class_name text) as $$
declare
  v_uid      uuid := auth.uid();
  v_recent   integer;
  v_class_id uuid;
  v_name     text;
  v_code     text;
begin
  if v_uid is null then
    raise exception 'Authentication required';
  end if;
  if coalesce(p_consent, false) is not true then
    raise exception 'Explicit data-sharing consent is required to join a class';
  end if;
  delete from public.class_join_attempts where attempted_at < now() - interval '24 hours';
  select count(*) into v_recent from public.class_join_attempts
   where user_id = v_uid and attempted_at > now() - interval '15 minutes';
  if v_recent >= 8 then
    raise exception 'Too many class code attempts. Please wait 15 minutes.';
  end if;
  insert into public.class_join_attempts (user_id, attempted_at) values (v_uid, now());
  v_code := upper(trim(coalesce(p_code, '')));
  if length(v_code) < 4 or length(v_code) > 12 then
    raise exception 'Invalid class code';
  end if;
  select id, name into v_class_id, v_name from public.classes where code = v_code;
  if v_class_id is null then
    raise exception 'Invalid class code';
  end if;
  insert into public.class_members(class_id, student_id, display_name, consent_given, consent_at)
    values (v_class_id, v_uid, substr(nullif(trim(p_display_name), ''), 1, 80), true, now())
    on conflict (class_id, student_id) do update
      set display_name = excluded.display_name, consent_given = true, consent_at = now();
  return query select v_class_id, v_name;
end;
$$ language plpgsql security definer set search_path = public;
revoke all on function public.join_class_by_code(text, text, boolean) from public, anon;
grant execute on function public.join_class_by_code(text, text, boolean) to authenticated, service_role;

-- ── assignments: "assign a chapter/mock exam to a roster" (Pillar 3 Scale
--    phase) — the other half of the teacher/parent view, alongside the
--    aggregate-mastery reads below. One row per assignment a teacher hands
--    to a whole class; `track` is a ClipSAT track id (e.g. "calculus"),
--    `label` is free text (e.g. "Chapter 3: Derivatives" or "Mock Exam 2")
--    since assignments aren't tied to a specific chapter-content id, just a
--    track + a human-readable description. See public/js/teacher-view.js.
create table if not exists public.assignments (
  id         uuid primary key default gen_random_uuid(),
  class_id   uuid not null references public.classes(id) on delete cascade,
  track      text not null,
  label      text not null,
  due_date   date,
  created_at timestamptz not null default now()
);

-- ── assignment_completions: a student's own self-reported "done" mark ────
create table if not exists public.assignment_completions (
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id    uuid not null references auth.users(id) on delete cascade,
  completed_at  timestamptz not null default now(),
  primary key (assignment_id, student_id)
);

alter table public.assignments enable row level security;
alter table public.assignment_completions enable row level security;

drop policy if exists "teacher manages own assignments" on public.assignments;
drop policy if exists "student reads class assignments" on public.assignments;
drop policy if exists "student manages own completion" on public.assignment_completions;
drop policy if exists "teacher reads roster completions" on public.assignment_completions;

-- Teacher creates/renames/deletes assignments only for classes they own.
create policy "teacher manages own assignments" on public.assignments for all using (
  exists (select 1 from public.classes c where c.id = assignments.class_id and c.owner_id = auth.uid())
) with check (
  exists (select 1 from public.classes c where c.id = assignments.class_id and c.owner_id = auth.uid())
);
-- A student sees assignments for any class they're a member of.
create policy "student reads class assignments" on public.assignments for select using (
  exists (select 1 from public.class_members cm where cm.class_id = assignments.class_id and cm.student_id = auth.uid())
);

-- A student manages only their own completion row, and only for an
-- assignment in a class they're actually a member of.
create policy "student manages own completion" on public.assignment_completions for all using (
  auth.uid() = student_id
) with check (
  auth.uid() = student_id
  and exists (
    select 1 from public.assignments a join public.class_members cm on cm.class_id = a.class_id
    where a.id = assignment_completions.assignment_id and cm.student_id = auth.uid()
  )
);
-- The teacher sees who's done, for aggregate counts — never write access.
create policy "teacher reads roster completions" on public.assignment_completions for select using (
  exists (
    select 1 from public.assignments a join public.classes c on c.id = a.class_id
    where a.id = assignment_completions.assignment_id and c.owner_id = auth.uid()
  )
);

-- Track-scoped, read-only teacher visibility (WP-44): teachers only see accuracy,
-- mistakes, and visits matching the track(s) of classes/assignments the student joined.
drop policy if exists "teacher reads roster accuracy"       on public.accuracy;
drop policy if exists "teacher reads roster mistakes"       on public.mistakes;
drop policy if exists "teacher reads roster chapter visits" on public.chapter_visits;
drop policy if exists "teacher reads roster profile"        on public.profiles;
drop policy if exists "teachers_read_scoped_class_accuracy" on public.accuracy;
drop policy if exists "teachers_read_scoped_class_mistakes" on public.mistakes;
drop policy if exists "teachers_read_scoped_class_visits"   on public.chapter_visits;

create policy "teachers_read_scoped_class_accuracy" on public.accuracy for select to authenticated using (
  exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = accuracy.user_id and cm.consent_given = true and c.owner_id = auth.uid()
      and (c.track = accuracy.track or exists (select 1 from public.assignments a where a.class_id = c.id and a.track = accuracy.track))
  )
);
create policy "teachers_read_scoped_class_mistakes" on public.mistakes for select to authenticated using (
  mistakes.deleted_at is null and exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = mistakes.user_id and cm.consent_given = true and c.owner_id = auth.uid()
      and (c.track = mistakes.view_id or exists (select 1 from public.assignments a where a.class_id = c.id and a.track = mistakes.view_id))
  )
);
create policy "teachers_read_scoped_class_visits" on public.chapter_visits for select to authenticated using (
  exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = chapter_visits.user_id and cm.consent_given = true and c.owner_id = auth.uid()
      and (c.track = chapter_visits.track or exists (select 1 from public.assignments a where a.class_id = c.id and a.track = chapter_visits.track))
  )
);
create policy "teacher reads roster profile" on public.profiles for select using (
  exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = profiles.user_id and cm.consent_given = true and c.owner_id = auth.uid()
  )
);

-- ── ai_usage: per-user daily call counter for the AI proxy Edge Function ──
-- Only ever touched by supabase/functions/ai-proxy (via the service_role
-- key, which bypasses RLS) — deliberately NO policies below, so a signed-in
-- user's own client can't read or reset their own quota. This is what
-- turns "sign-in required" into an actual spend cap rather than just a
-- login wall: see ai-proxy/index.ts for the check-then-increment logic.
create table if not exists public.ai_usage (
  user_id    uuid not null references auth.users(id) on delete cascade,
  day        date not null default current_date,
  calls      integer not null default 0,
  tts_calls  integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

alter table public.ai_usage enable row level security;

-- Atomic "count this call against today's quota, but only if under the cap"
-- in one statement — avoids a separate read-then-write race where two
-- requests landing at once could both read "under cap" and both proceed.
-- The UPDATE branch's WHERE clause is what makes this atomic: if today's
-- row is already at/over p_cap, the ON CONFLICT DO UPDATE simply matches
-- zero rows, RETURNING yields nothing, and v_calls stays null → false.
-- The very first call of the day always succeeds (plain INSERT, cap check
-- doesn't apply there) since 1 is always <= any sane cap.
-- Legacy try_use_ai_quota was superseded by use_ai_quota (migrations/20261030_*)
-- and is explicitly dropped + revoked so clients can never invoke it via RPC.
drop function if exists public.try_use_ai_quota(uuid, integer);

create table if not exists public.ai_plans (
  user_id              uuid primary key references auth.users(id) on delete cascade,
  tier                 text not null default 'free' check (tier in ('free', 'paid')),
  paid_until           timestamptz,
  provider             text default null,
  external_customer_id text default null,
  external_sub_id      text default null,
  daily_credits        integer not null default 20,
  trial_ends_at        timestamptz default null,
  cancel_at_period_end boolean not null default false,
  updated_at           timestamptz not null default now()
);
alter table public.ai_plans enable row level security;
drop policy if exists "own ai plan" on public.ai_plans;
create policy "own ai plan" on public.ai_plans for select to authenticated using (auth.uid() = user_id);

create or replace function public.use_ai_quota(
  p_user_id uuid,
  p_base_cap integer,
  p_cost integer,
  p_paid_multiplier integer
) returns table (allowed boolean, used integer, cap integer, paid boolean) as $$
declare
  v_paid         boolean := false;
  v_plan_credits integer := null;
  v_cap          integer;
  v_used         integer;
begin
  select
    (tier = 'paid' and (paid_until is null or paid_until > now())),
    daily_credits
    into v_paid, v_plan_credits
    from public.ai_plans
   where user_id = p_user_id;

  v_paid := coalesce(v_paid, false);
  if v_paid then
    v_cap := greatest(p_base_cap * p_paid_multiplier, coalesce(v_plan_credits, p_base_cap * p_paid_multiplier));
  else
    v_cap := greatest(p_base_cap, coalesce(v_plan_credits, p_base_cap));
  end if;

  insert into public.ai_usage (user_id, day, calls)
    values (p_user_id, current_date, p_cost)
    on conflict (user_id, day) do update
      set calls = public.ai_usage.calls + p_cost, updated_at = now()
      where public.ai_usage.calls + p_cost <= v_cap
    returning calls into v_used;

  if v_used is not null then
    return query select true, v_used, v_cap, v_paid;
  else
    select calls into v_used from public.ai_usage where user_id = p_user_id and day = current_date;
    return query select false, coalesce(v_used, 0), v_cap, v_paid;
  end if;
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.use_ai_quota(uuid, integer, integer, integer) from public, anon, authenticated;
grant execute on function public.use_ai_quota(uuid, integer, integer, integer) to service_role;

create or replace function public.refund_ai_quota(p_user_id uuid, p_cost integer) returns integer as $$
declare v_used integer;
begin
  update public.ai_usage
     set calls = greatest(0, calls - greatest(0, coalesce(p_cost, 1))), updated_at = now()
   where user_id = p_user_id and day = current_date
  returning calls into v_used;
  return coalesce(v_used, 0);
end;
$$ language plpgsql security definer set search_path = public;
revoke all on function public.refund_ai_quota(uuid, integer) from public, anon, authenticated;
grant execute on function public.refund_ai_quota(uuid, integer) to service_role;

create or replace function public.use_tts_quota(
  p_user_id uuid, p_base_cap integer, p_cost integer, p_paid_multiplier integer
) returns table (allowed boolean, used integer, cap integer, paid boolean) as $$
declare v_paid boolean := false; v_cap integer; v_used integer;
begin
  select exists (
    select 1 from public.ai_plans
     where user_id = p_user_id and tier = 'paid' and (paid_until is null or paid_until > now())
  ) into v_paid;
  v_cap := p_base_cap * case when v_paid then p_paid_multiplier else 1 end;
  insert into public.ai_usage (user_id, day, calls, tts_calls)
    values (p_user_id, current_date, 0, p_cost)
    on conflict (user_id, day) do update
      set tts_calls = public.ai_usage.tts_calls + p_cost, updated_at = now()
      where public.ai_usage.tts_calls + p_cost <= v_cap
    returning tts_calls into v_used;
  if v_used is not null then
    return query select true, v_used, v_cap, v_paid;
  else
    select tts_calls into v_used from public.ai_usage where user_id = p_user_id and day = current_date;
    return query select false, coalesce(v_used, 0), v_cap, v_paid;
  end if;
end;
$$ language plpgsql security definer set search_path = public;
revoke all on function public.use_tts_quota(uuid, integer, integer, integer) from public, anon, authenticated;
grant execute on function public.use_tts_quota(uuid, integer, integer, integer) to service_role;

create or replace function public.refund_tts_quota(p_user_id uuid, p_cost integer) returns integer as $$
declare v_used integer;
begin
  update public.ai_usage
     set tts_calls = greatest(0, tts_calls - greatest(0, coalesce(p_cost, 1))), updated_at = now()
   where user_id = p_user_id and day = current_date
  returning tts_calls into v_used;
  return coalesce(v_used, 0);
end;
$$ language plpgsql security definer set search_path = public;
revoke all on function public.refund_tts_quota(uuid, integer) from public, anon, authenticated;
grant execute on function public.refund_tts_quota(uuid, integer) to service_role;

create or replace function public.get_my_daily_usage()
returns table (
  tier text, paid boolean, paid_until timestamptz, trial_ends_at timestamptz,
  cancel_at_period_end boolean, ai_used integer, ai_cap integer, tts_used integer, tts_cap integer
) as $$
declare
  v_uid   uuid := auth.uid();
  v_plan  public.ai_plans%rowtype;
  v_usage public.ai_usage%rowtype;
  v_paid  boolean := false;
  v_aicap integer := 20;
begin
  if v_uid is null then raise exception 'Authentication required'; end if;
  select * into v_plan from public.ai_plans where user_id = v_uid;
  select * into v_usage from public.ai_usage where user_id = v_uid and day = current_date;
  v_paid := (v_plan.tier = 'paid' and (v_plan.paid_until is null or v_plan.paid_until > now()));
  v_aicap := case when v_paid then greatest(200, coalesce(v_plan.daily_credits, 200)) else greatest(20, coalesce(v_plan.daily_credits, 20)) end;
  return query select
    coalesce(v_plan.tier, 'free'), v_paid, v_plan.paid_until, v_plan.trial_ends_at,
    coalesce(v_plan.cancel_at_period_end, false), coalesce(v_usage.calls, 0), v_aicap,
    coalesce(v_usage.tts_calls, 0), case when v_paid then 600 else 60 end;
end;
$$ language plpgsql stable security definer set search_path = public;
revoke all on function public.get_my_daily_usage() from public, anon;
grant execute on function public.get_my_daily_usage() to authenticated, service_role;

-- ── google_oauth_tokens: lets one "Sign in with Google" also cover Forms/
-- Drive access, instead of a second separate Google connect step.
-- Supabase does NOT persist a provider's OAuth refresh token itself (by
-- design — see their docs) — it's only ever handed to the client once, in
-- the sign-in response. This table is where ClipSAT keeps it long-term so
-- supabase/functions/google-token can exchange it for a fresh short-lived
-- access token whenever the Forms/Drive integration needs one, without
-- re-prompting the user.
-- Write-only from the client's own session (its own row, via the policies
-- below) — there is deliberately NO select policy, so a signed-in user's
-- own client can store its refresh token here but can never read it back;
-- only the Edge Function (service_role, bypasses RLS) ever does. Same
-- "the client can put a secret in, never take one back out" shape as
-- ai_usage's write-only-in-effect design above, just for a different
-- reason (that's a spend counter; this is an actual credential).
create schema if not exists vault;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
do $$
begin
  execute 'create extension if not exists supabase_vault with schema vault';
exception when others then
  null;
end $$;

create table if not exists public.google_oauth_tokens (
  user_id                 uuid primary key references auth.users(id) on delete cascade,
  refresh_token           text,
  vault_secret_id         uuid,
  encrypted_refresh_token bytea,
  updated_at              timestamptz not null default now()
);

alter table public.google_oauth_tokens enable row level security;

drop policy if exists "user stores own google token"  on public.google_oauth_tokens;
drop policy if exists "user replaces own google token" on public.google_oauth_tokens;

create or replace function public.upsert_google_refresh_token(p_refresh_token text)
returns void as $$
declare
  v_uid uuid := auth.uid();
  v_existing_sid uuid;
  v_new_sid uuid;
begin
  if v_uid is null then
    raise exception 'Authentication required';
  end if;
  if p_refresh_token is null or length(trim(p_refresh_token)) < 10 or length(p_refresh_token) > 4096 then
    raise exception 'Invalid refresh token';
  end if;

  select vault_secret_id into v_existing_sid
    from public.google_oauth_tokens
   where user_id = v_uid;

  if v_existing_sid is not null then
    perform vault.update_secret(v_existing_sid, p_refresh_token, 'google_oauth_' || v_uid::text, 'ClipSAT Google OAuth refresh token');
    v_new_sid := v_existing_sid;
  else
    v_new_sid := vault.create_secret(p_refresh_token, 'google_oauth_' || v_uid::text, 'ClipSAT Google OAuth refresh token');
  end if;

  insert into public.google_oauth_tokens (user_id, refresh_token, vault_secret_id, updated_at)
  values (v_uid, null, v_new_sid, now())
  on conflict (user_id) do update
     set refresh_token = null,
         vault_secret_id = excluded.vault_secret_id,
         updated_at = now();
end;
$$ language plpgsql security definer set search_path = public, vault;

revoke all on function public.upsert_google_refresh_token(text) from public, anon;
grant execute on function public.upsert_google_refresh_token(text) to authenticated, service_role;

create or replace function public.get_google_refresh_token_admin(p_user_id uuid)
returns text as $$
declare
  v_sid uuid;
  v_legacy text;
  v_decrypted text;
begin
  select vault_secret_id, refresh_token
    into v_sid, v_legacy
    from public.google_oauth_tokens
   where user_id = p_user_id;

  if v_sid is not null then
    select decrypted_secret into v_decrypted
      from vault.decrypted_secrets
     where id = v_sid;
    if v_decrypted is not null then
      return v_decrypted;
    end if;
  end if;

  return v_legacy;
end;
$$ language plpgsql security definer set search_path = public, vault;

revoke all on function public.get_google_refresh_token_admin(uuid) from public, anon, authenticated;
grant execute on function public.get_google_refresh_token_admin(uuid) to service_role;

create or replace function public.delete_google_refresh_token_admin(p_user_id uuid)
returns void as $$
declare
  v_sid uuid;
begin
  select vault_secret_id into v_sid
    from public.google_oauth_tokens
   where user_id = p_user_id;

  if v_sid is not null then
    delete from vault.secrets where id = v_sid;
  end if;

  delete from public.google_oauth_tokens where user_id = p_user_id;
end;
$$ language plpgsql security definer set search_path = public, vault;

revoke all on function public.delete_google_refresh_token_admin(uuid) from public, anon, authenticated;
grant execute on function public.delete_google_refresh_token_admin(uuid) to service_role;

-- ── site_visits: a single running total of visits to the whole site ──────
-- Powers the "Growing every day" counter on the home page. Replaces a
-- third-party hits.sh badge <img>, which — being a single lazy-loaded image
-- placed only in the home page's own last section — undercounted by
-- construction: it never fired for a visitor who landed on any other page,
-- or for a home-page visitor who never scrolled that far down. See
-- public/js/visit-counter.js for the client side: it increments this once
-- per browser tab per site visit, from every page, not just the home page.
--
-- One row, one column, no user_id/IP/identifying data of any kind attached.
create table if not exists public.site_visits (
  id         smallint primary key default 1,
  count      bigint not null default 0,
  updated_at timestamptz not null default now(),
  constraint site_visits_single_row check (id = 1)
);
insert into public.site_visits (id, count) values (1, 0) on conflict (id) do nothing;

alter table public.site_visits enable row level security;

drop policy if exists "anyone reads the visit count" on public.site_visits;
-- Read-only for everyone (signed in or not) — the count itself isn't
-- sensitive and the home page needs to display it without an account.
create policy "anyone reads the visit count" on public.site_visits for select using (true);
-- Deliberately NO insert/update/delete policy for anon/authenticated: the
-- only way this row ever changes is the SECURITY DEFINER function below,
-- which runs as the table owner and bypasses RLS entirely — so nobody can
-- PATCH the row directly through the REST API and set the count to
-- whatever they like.

create or replace function public.increment_site_visits()
returns bigint as $$
declare
  v_count bigint;
begin
  update public.site_visits set count = count + 1, updated_at = now()
    where id = 1
    returning count into v_count;
  return v_count;
end;
$$ language plpgsql security definer set search_path = public;

-- ── client_errors: uncaught-JS-error log (Plan 5, Phase 5.010) ───────────
-- The "error logging" half of Phase 5.010's uptime/error-monitoring pair —
-- see the ClipSAT roadmap artifact's Pillar 5 status panel, and
-- public/js/error-logging.js for the client side (window.onerror /
-- unhandledrejection → log_client_error()).
--
-- Same write shape as site_visits above and the same reason: RLS enabled,
-- ZERO policies (so every direct table operation — including SELECT — is
-- denied to anon/authenticated by default), and the only door in is a
-- SECURITY DEFINER function that bypasses RLS. That means a client can
-- report an error but can never read this table back through the public
-- API; only the project owner does, via the Supabase dashboard/service_role.
create table if not exists public.client_errors (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  track      text,
  message    text not null,
  source     text,
  line       integer,
  col        integer,
  stack      text,
  user_agent text,
  page_url   text
);

alter table public.client_errors enable row level security;

-- Caps are deliberately generous, not tuned: the real backstop against a
-- runaway error loop (the same bug throwing hundreds of times a second) is
-- error-logging.js's own per-tab-session cap + dedupe, which is what keeps
-- this from ever needing to reject a legitimate report. These are just
-- input-size sanity limits so one malformed payload can't write an
-- unbounded row.
create or replace function public.log_client_error(
  p_message    text,
  p_track      text default null,
  p_source     text default null,
  p_line       integer default null,
  p_col        integer default null,
  p_stack      text default null,
  p_page_url   text default null,
  p_user_agent text default null
)
returns void as $$
begin
  if p_message is null or length(trim(p_message)) = 0 then
    return; -- nothing worth logging
  end if;
  delete from public.client_errors
   where id in (
     select c.id from public.client_errors c
      where c.created_at < now() - interval '30 days'
      limit 50
   );
  insert into public.client_errors (message, track, source, line, col, stack, page_url, user_agent)
  values (
    left(p_message, 2000),
    left(p_track, 40),
    left(p_source, 500),
    p_line,
    p_col,
    left(p_stack, 4000),
    left(p_page_url, 500),
    left(p_user_agent, 300)
  );
end;
$$ language plpgsql security definer set search_path = public;

-- ── question_error_flags: user/teacher error reports on examples, quizzes & exams ──
-- Stores structured error flags reported via the 🚩 Report Error button across
-- lesson examples, practice problems, interactive activities, chapter quizzes,
-- mock exams, diagnostic tests, AI exams, and full bank exams.
-- Automatically pulled, revised/fixed, and marked resolved by
-- scripts/revise-and-fix-flagged-errors.js on every build/push/deploy.
create table if not exists public.question_error_flags (
  flag_id           text primary key,
  track             text not null,
  topic_id          text,
  source_type       text not null,
  item_id           text not null,
  category          text not null default 'other',
  note              text,
  question_snapshot jsonb not null default '{}'::jsonb,
  content_signature text,
  status            text not null default 'open',
  report_count      integer not null default 1,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  resolved_at       timestamptz,
  resolved_in_build text
);

alter table public.question_error_flags enable row level security;

-- Deliberately NO public/authenticated SELECT policy on question_error_flags:
-- error reports may contain free-text notes and snapshots and are read only
-- server-side via service_role.
drop policy if exists "anyone reads question error flags" on public.question_error_flags;

create or replace function public.report_question_error(
  p_flag_id           text,
  p_track             text,
  p_topic_id          text default null,
  p_source_type       text default 'question',
  p_item_id           text default '',
  p_category          text default 'other',
  p_note              text default null,
  p_question_snapshot jsonb default '{}'::jsonb,
  p_content_signature text default null
)
returns void as $$
declare
  v_snap jsonb;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  if p_flag_id is null or length(trim(p_flag_id)) = 0 then
    return;
  end if;
  v_snap := coalesce(p_question_snapshot, '{}'::jsonb);
  if octet_length(v_snap::text) > 8192 then
    v_snap := jsonb_build_object('truncated', true);
  end if;
  insert into public.question_error_flags (
    flag_id, track, topic_id, source_type, item_id, category, note,
    question_snapshot, content_signature, status, report_count, created_at, updated_at
  )
  values (
    left(p_flag_id, 200),
    left(coalesce(p_track, 'home'), 40),
    left(p_topic_id, 80),
    left(coalesce(p_source_type, 'question'), 60),
    left(coalesce(p_item_id, ''), 120),
    left(coalesce(p_category, 'other'), 40),
    left(p_note, 1000),
    v_snap,
    left(p_content_signature, 64),
    'open',
    1,
    now(),
    now()
  )
  on conflict (flag_id) do update set
    report_count = least(public.question_error_flags.report_count + 1, 10000),
    updated_at   = now();
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.report_question_error(text, text, text, text, text, text, text, jsonb, text) from public, anon;
grant execute on function public.report_question_error(text, text, text, text, text, text, text, jsonb, text) to authenticated, service_role;

create or replace function public.resolve_question_error(
  p_flag_id       text,
  p_build_version text default null
)
returns void as $$
begin
  update public.question_error_flags
     set status = 'resolved',
         resolved_at = now(),
         resolved_in_build = left(p_build_version, 64),
         updated_at = now()
   where flag_id = p_flag_id or item_id = p_flag_id;
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.resolve_question_error(text, text) from public, anon, authenticated;
grant execute on function public.resolve_question_error(text, text) to service_role;

-- Self-service account deletion (Saudi PDPL & GDPR Right to Erasure).
-- Deletes any Vault-encrypted OAuth secret and the caller's auth.users row;
-- ON DELETE CASCADE wipes profiles, progress, accuracy, mistakes, srs_state,
-- custom_cards, chapter_visits, class_members, classes, ai_usage, ai_plans,
-- and google_oauth_tokens.
create or replace function public.delete_my_account()
returns void as $$
declare
  v_uid uuid := auth.uid();
  v_sid uuid;
begin
  if v_uid is null then
    raise exception 'Authentication required';
  end if;
  select vault_secret_id into v_sid
    from public.google_oauth_tokens
   where user_id = v_uid;
  if v_sid is not null then
    delete from vault.secrets where id = v_sid;
  end if;
  delete from auth.users where id = v_uid;
end;
$$ language plpgsql security definer set search_path = public, auth, vault;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated, service_role;

-- ── Wave 4: Server-Verified Assignment Submissions & HMAC Certificates (WP-44) ──
create table if not exists public.assignment_signing_secrets (
  id         smallint primary key default 1 check (id = 1),
  secret_hex text not null,
  created_at timestamptz not null default now()
);
alter table public.assignment_signing_secrets enable row level security;

insert into public.assignment_signing_secrets (id, secret_hex)
values (1, encode(extensions.gen_random_bytes(32), 'hex'))
on conflict (id) do nothing;

create table if not exists public.assignment_submissions (
  id              uuid primary key default gen_random_uuid(),
  assignment_id   uuid references public.assignments(id) on delete set null,
  class_id        uuid references public.classes(id) on delete set null,
  student_id      uuid not null references auth.users(id) on delete cascade,
  track           text not null,
  assignment_keys text not null,
  score           integer not null check (score >= 0 and score <= total),
  total           integer not null check (total > 0 and total <= 500),
  answers         jsonb not null default '{}'::jsonb,
  hmac_sig        text not null,
  created_at      timestamptz not null default now()
);
alter table public.assignment_submissions enable row level security;

drop policy if exists "student reads own submissions"   on public.assignment_submissions;
drop policy if exists "teacher reads class submissions" on public.assignment_submissions;

create policy "student reads own submissions" on public.assignment_submissions
  for select to authenticated using (auth.uid() = student_id);

create policy "teacher reads class submissions" on public.assignment_submissions
  for select to authenticated using (
    exists (
      select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
      where cm.student_id = assignment_submissions.student_id and cm.consent_given = true and c.owner_id = auth.uid()
        and (
          c.id = assignment_submissions.class_id
          or c.track = assignment_submissions.track
          or exists (
            select 1 from public.assignments a
            where a.class_id = c.id and (a.id = assignment_submissions.assignment_id or a.track = assignment_submissions.track)
          )
        )
    )
  );

create or replace function public.submit_verified_assignment(
  p_track           text,
  p_assignment_keys text,
  p_score           integer,
  p_total           integer,
  p_answers         jsonb default '{}'::jsonb,
  p_assignment_id   uuid default null,
  p_class_id        uuid default null
)
returns table(submission_id uuid, hmac_sig text, verify_code text) as $$
declare
  v_uid     uuid := auth.uid();
  v_sub_id  uuid := gen_random_uuid();
  v_track   text := lower(trim(coalesce(p_track, '')));
  v_keys    text := left(trim(coalesce(p_assignment_keys, '')), 2000);
  v_secret  text;
  v_payload text;
  v_sig     text;
  v_ans     jsonb := coalesce(p_answers, '{}'::jsonb);
  v_cid     uuid := p_class_id;
begin
  if v_uid is null then
    raise exception 'Authentication required';
  end if;
  if v_track = '' or length(v_track) > 40 then
    raise exception 'Invalid track identifier';
  end if;
  if p_total is null or p_total <= 0 or p_total > 500 or p_score is null or p_score < 0 or p_score > p_total then
    raise exception 'Invalid score bounds';
  end if;
  if octet_length(v_ans::text) > 16384 then
    v_ans := jsonb_build_object('truncated', true);
  end if;
  if v_cid is null and p_assignment_id is not null then
    select a.class_id into v_cid from public.assignments a where a.id = p_assignment_id;
  end if;
  select s.secret_hex into v_secret from public.assignment_signing_secrets s where s.id = 1;
  if v_secret is null then
    v_secret := encode(extensions.gen_random_bytes(32), 'hex');
    insert into public.assignment_signing_secrets (id, secret_hex) values (1, v_secret)
    on conflict (id) do update set secret_hex = excluded.secret_hex;
  end if;
  v_payload := v_sub_id::text || ':' || v_uid::text || ':' || v_track || ':' || p_score::text || '/' || p_total::text || ':' || v_keys;
  v_sig := encode(extensions.hmac(convert_to(v_payload, 'UTF8'), convert_to(v_secret, 'UTF8'), 'sha256'), 'hex');
  insert into public.assignment_submissions (
    id, assignment_id, class_id, student_id, track, assignment_keys, score, total, answers, hmac_sig
  ) values (
    v_sub_id, p_assignment_id, v_cid, v_uid, v_track, v_keys, p_score, p_total, v_ans, v_sig
  );
  if p_assignment_id is not null and exists (
    select 1 from public.assignments a join public.class_members cm on cm.class_id = a.class_id
    where a.id = p_assignment_id and cm.student_id = v_uid
  ) then
    insert into public.assignment_completions (assignment_id, student_id, completed_at)
    values (p_assignment_id, v_uid, now())
    on conflict (assignment_id, student_id) do update set completed_at = now();
  end if;
  return query select v_sub_id, v_sig, ('CS-VERIFIED-' || v_sub_id::text || '-' || upper(substr(v_sig, 1, 16)))::text;
end;
$$ language plpgsql security definer set search_path = public, extensions;

revoke all on function public.submit_verified_assignment(text, text, integer, integer, jsonb, uuid, uuid) from public, anon;
grant execute on function public.submit_verified_assignment(text, text, integer, integer, jsonb, uuid, uuid) to authenticated, service_role;

create or replace function public.verify_assignment_certificate(
  p_submission_id uuid,
  p_sig_prefix    text
)
returns table(valid boolean, student_id uuid, track text, score integer, total integer, submitted_at timestamptz) as $$
declare
  v_row     public.assignment_submissions%rowtype;
  v_secret  text;
  v_payload text;
  v_expect  text;
  v_clean   text := lower(trim(coalesce(p_sig_prefix, '')));
begin
  if auth.uid() is null and current_setting('role', true) <> 'service_role' then
    raise exception 'Authentication required';
  end if;
  select * into v_row from public.assignment_submissions s where s.id = p_submission_id;
  if not found or length(v_clean) < 16 then
    return query select false, null::uuid, null::text, null::integer, null::integer, null::timestamptz;
    return;
  end if;
  select s.secret_hex into v_secret from public.assignment_signing_secrets s where s.id = 1;
  v_payload := v_row.id::text || ':' || v_row.student_id::text || ':' || v_row.track || ':' || v_row.score::text || '/' || v_row.total::text || ':' || v_row.assignment_keys;
  v_expect := encode(extensions.hmac(convert_to(v_payload, 'UTF8'), convert_to(coalesce(v_secret, ''), 'UTF8'), 'sha256'), 'hex');
  if v_expect = v_row.hmac_sig and (v_clean = v_expect or v_clean = substr(v_expect, 1, 16)) then
    return query select true, v_row.student_id, v_row.track, v_row.score, v_row.total, v_row.created_at;
  else
    return query select false, null::uuid, null::text, null::integer, null::integer, null::timestamptz;
  end if;
end;
$$ language plpgsql security definer set search_path = public, extensions;

revoke all on function public.verify_assignment_certificate(uuid, text) from public, anon;
grant execute on function public.verify_assignment_certificate(uuid, text) to authenticated, service_role;

-- ── Wave 4: Billing Webhook Idempotency & Cookieless Calibration Telemetry (WP-45/46) ──
create table if not exists public.billing_webhook_events (
  event_id      text primary key,
  provider      text not null check (provider in ('moyasar', 'stripe')),
  event_type    text not null,
  user_id       uuid references auth.users(id) on delete set null,
  amount_halala integer,
  currency      text default 'SAR',
  processed_at  timestamptz not null default now()
);
alter table public.billing_webhook_events enable row level security;

create table if not exists public.item_calibration_telemetry (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  track       text not null,
  item_id     text not null,
  correct     boolean not null,
  dwell_ms    integer not null check (dwell_ms >= 0 and dwell_ms <= 3600000),
  rapid_guess boolean not null default false,
  theta_est   real
);
alter table public.item_calibration_telemetry enable row level security;

create or replace function public.log_item_calibration(
  p_track       text,
  p_item_id     text,
  p_correct     boolean,
  p_dwell_ms    integer,
  p_rapid_guess boolean default false,
  p_theta_est   real default null
)
returns void as $$
begin
  if p_track is null or length(trim(p_track)) = 0 or p_item_id is null or length(trim(p_item_id)) = 0 then
    return;
  end if;
  insert into public.item_calibration_telemetry (track, item_id, correct, dwell_ms, rapid_guess, theta_est)
  values (
    left(lower(trim(p_track)), 40),
    left(trim(p_item_id), 80),
    coalesce(p_correct, false),
    greatest(0, least(coalesce(p_dwell_ms, 0), 3600000)),
    coalesce(p_rapid_guess, false),
    case when p_theta_est is null then null else greatest(-5.0, least(5.0, p_theta_est)) end
  );
end;
$$ language plpgsql security definer set search_path = public;

grant execute on function public.log_item_calibration(text, text, boolean, integer, boolean, real) to anon, authenticated, service_role;

create or replace function public.prune_old_telemetry()
returns integer as $$
declare
  v_err_del integer := 0;
  v_cal_del integer := 0;
begin
  delete from public.client_errors where created_at < now() - interval '30 days';
  get diagnostics v_err_del = row_count;
  delete from public.item_calibration_telemetry where created_at < now() - interval '30 days';
  get diagnostics v_cal_del = row_count;
  return v_err_del + v_cal_del;
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.prune_old_telemetry() from public, anon, authenticated;
grant execute on function public.prune_old_telemetry() to service_role;


