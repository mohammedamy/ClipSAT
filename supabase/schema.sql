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
  created_at timestamptz not null default now()
);

create table if not exists public.class_members (
  class_id     uuid not null references public.classes(id) on delete cascade,
  student_id   uuid not null references auth.users(id) on delete cascade,
  display_name text,
  joined_at    timestamptz not null default now(),
  primary key (class_id, student_id)
);

alter table public.classes       enable row level security;
alter table public.class_members enable row level security;

drop policy if exists "own classes"        on public.classes;
drop policy if exists "own membership"     on public.class_members;
drop policy if exists "leave class"        on public.class_members;
drop policy if exists "teacher sees roster" on public.class_members;
drop policy if exists "teacher removes member" on public.class_members;

-- Teacher manages their own classes (create/rename/delete/see the code)
create policy "own classes" on public.classes for all
  using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

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

-- Joining goes through this function only — never a direct table write. A
-- student is never granted SELECT on public.classes itself (that would leak
-- every class's name/code to any signed-in user); SECURITY DEFINER lets the
-- function look up one row by its exact code on the student's behalf without
-- widening their own read access. Re-joining with a new display name just
-- updates it (on conflict), so this also doubles as an in-place rename.
create or replace function public.join_class_by_code(p_code text, p_display_name text default null)
returns table(class_id uuid, class_name text) as $$
declare
  v_class_id uuid;
  v_name     text;
begin
  select id, name into v_class_id, v_name from public.classes where code = upper(trim(p_code));
  if v_class_id is null then
    raise exception 'Invalid class code';
  end if;
  insert into public.class_members(class_id, student_id, display_name)
    values (v_class_id, auth.uid(), nullif(trim(p_display_name), ''))
    on conflict (class_id, student_id) do update set display_name = excluded.display_name;
  return query select v_class_id, v_name;
end;
$$ language plpgsql security definer set search_path = public;

-- Additive, read-only: a teacher can read (never write) a roster member's
-- rows in the tables the mastery dashboard already reads from. Each
-- student's own "own accuracy"-style policy above is untouched — this is
-- a second, separate permissive policy, not a replacement.
drop policy if exists "teacher reads roster accuracy"       on public.accuracy;
drop policy if exists "teacher reads roster mistakes"       on public.mistakes;
drop policy if exists "teacher reads roster chapter visits" on public.chapter_visits;
drop policy if exists "teacher reads roster profile"        on public.profiles;

create policy "teacher reads roster accuracy" on public.accuracy for select using (
  exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = accuracy.user_id and c.owner_id = auth.uid()
  )
);
create policy "teacher reads roster mistakes" on public.mistakes for select using (
  exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = mistakes.user_id and c.owner_id = auth.uid()
  )
);
create policy "teacher reads roster chapter visits" on public.chapter_visits for select using (
  exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = chapter_visits.user_id and c.owner_id = auth.uid()
  )
);
create policy "teacher reads roster profile" on public.profiles for select using (
  exists (
    select 1 from public.class_members cm join public.classes c on c.id = cm.class_id
    where cm.student_id = profiles.user_id and c.owner_id = auth.uid()
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
create or replace function public.try_use_ai_quota(p_user_id uuid, p_cap integer)
returns boolean as $$
declare
  v_calls integer;
begin
  insert into public.ai_usage (user_id, day, calls)
    values (p_user_id, current_date, 1)
    on conflict (user_id, day) do update
      set calls = public.ai_usage.calls + 1, updated_at = now()
      where public.ai_usage.calls < p_cap
    returning calls into v_calls;
  return v_calls is not null;
end;
$$ language plpgsql security definer set search_path = public;
