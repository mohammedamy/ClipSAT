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

-- ── Row Level Security: every table is only readable/writable by its owner ─
-- This is the entire access-control story — the anon key in cloud-config.js
-- is public by design; it can only ever touch rows where auth.uid() matches.
alter table public.profiles       enable row level security;
alter table public.mistakes       enable row level security;
alter table public.srs_state      enable row level security;
alter table public.chapter_visits enable row level security;

create policy "own profile"        on public.profiles       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own mistakes"       on public.mistakes       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own srs state"      on public.srs_state      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own chapter visits" on public.chapter_visits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

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
