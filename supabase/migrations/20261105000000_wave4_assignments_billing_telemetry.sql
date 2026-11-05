-- Wave 4 (WP-44, WP-45, WP-46): Server-Verified Teacher Assignments, Scoped Privacy,
-- Automated SAR Billing Provisioning (Moyasar + Stripe), and 30-Day Telemetry Retention
-- ════════════════════════════════════════════════════════════════════════════════════════
-- Self-contained & idempotent: safe to run in full in the Supabase SQL Editor even if
-- intermediate schema tables (`public.assignments`, `public.assignment_completions`,
-- `public.client_errors`, etc.) were not previously created on the live database.

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- ── 0. Ensure Prerequisite Core & Teacher/Assignment Tables Exist ──────────────────────
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
alter table public.profiles enable row level security;

create table if not exists public.mistakes (
  user_id       uuid not null references auth.users(id) on delete cascade,
  id            text not null,
  view_id       text default '',
  q             text default '',
  wrong         text default '',
  correct       text default '',
  domain        text default '',
  src           text default '',
  ts            bigint not null,
  reviewed_at   bigint default 0,
  ease_factor   real default 2.5,
  interval_days integer default 1,
  next_review   bigint,
  deleted_at    timestamptz default null,
  updated_at    timestamptz not null default now(),
  primary key (user_id, id)
);
alter table public.mistakes
  add column if not exists deleted_at timestamptz default null;
create index if not exists idx_mistakes_user_active
  on public.mistakes (user_id)
  where deleted_at is null;
alter table public.mistakes enable row level security;

create table if not exists public.chapter_visits (
  user_id    uuid not null references auth.users(id) on delete cascade,
  track      text not null,
  count      integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);
alter table public.chapter_visits enable row level security;

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
alter table public.accuracy enable row level security;

create table if not exists public.classes (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references auth.users(id) on delete cascade,
  name       text not null,
  code       text not null unique,
  track      text default null,
  created_at timestamptz not null default now()
);
alter table public.classes
  add column if not exists track text default null;
alter table public.classes enable row level security;

drop policy if exists "own classes" on public.classes;
create policy "own classes" on public.classes for all
  using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create table if not exists public.class_members (
  class_id      uuid not null references public.classes(id) on delete cascade,
  student_id    uuid not null references auth.users(id) on delete cascade,
  display_name  text,
  consent_given boolean not null default true,
  consent_at    timestamptz not null default now(),
  joined_at     timestamptz not null default now(),
  primary key (class_id, student_id)
);
alter table public.class_members
  add column if not exists consent_given boolean not null default true,
  add column if not exists consent_at    timestamptz not null default now();
alter table public.class_members enable row level security;

drop policy if exists "own membership"         on public.class_members;
drop policy if exists "leave class"            on public.class_members;
drop policy if exists "teacher sees roster"    on public.class_members;
drop policy if exists "teacher removes member" on public.class_members;

create policy "own membership" on public.class_members
  for select using (auth.uid() = student_id);
create policy "leave class" on public.class_members
  for delete using (auth.uid() = student_id);
create policy "teacher sees roster" on public.class_members
  for select using (
    exists (select 1 from public.classes c where c.id = class_id and c.owner_id = auth.uid())
  );
create policy "teacher removes member" on public.class_members
  for delete using (
    exists (select 1 from public.classes c where c.id = class_id and c.owner_id = auth.uid())
  );

create table if not exists public.assignments (
  id         uuid primary key default gen_random_uuid(),
  class_id   uuid not null references public.classes(id) on delete cascade,
  track      text not null,
  label      text not null,
  due_date   date,
  created_at timestamptz not null default now()
);
alter table public.assignments enable row level security;

create table if not exists public.assignment_completions (
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id    uuid not null references auth.users(id) on delete cascade,
  completed_at  timestamptz not null default now(),
  primary key (assignment_id, student_id)
);
alter table public.assignment_completions enable row level security;

drop policy if exists "teacher manages own assignments"  on public.assignments;
drop policy if exists "student reads class assignments"  on public.assignments;
drop policy if exists "student manages own completion"   on public.assignment_completions;
drop policy if exists "teacher reads roster completions" on public.assignment_completions;

create policy "teacher manages own assignments" on public.assignments for all using (
  exists (select 1 from public.classes c where c.id = assignments.class_id and c.owner_id = auth.uid())
) with check (
  exists (select 1 from public.classes c where c.id = assignments.class_id and c.owner_id = auth.uid())
);

create policy "student reads class assignments" on public.assignments for select using (
  exists (select 1 from public.class_members cm where cm.class_id = assignments.class_id and cm.student_id = auth.uid())
);

create policy "student manages own completion" on public.assignment_completions for all using (
  auth.uid() = student_id
) with check (
  auth.uid() = student_id
  and exists (
    select 1 from public.assignments a
    join public.class_members cm on cm.class_id = a.class_id
    where a.id = assignment_completions.assignment_id and cm.student_id = auth.uid()
  )
);

create policy "teacher reads roster completions" on public.assignment_completions for select using (
  exists (
    select 1 from public.assignments a
    join public.classes c on c.id = a.class_id
    where a.id = assignment_completions.assignment_id and c.owner_id = auth.uid()
  )
);

-- ── 1. Scoped Teacher Classes, Student Consent & Join Rate Limiting (WP-44) ────────────
create table if not exists public.class_join_attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  attempted_at timestamptz not null default now()
);
create index if not exists idx_class_join_attempts_user_time
  on public.class_join_attempts (user_id, attempted_at desc);

alter table public.class_join_attempts enable row level security;
-- Zero client policies on class_join_attempts (managed strictly inside join_class_by_code).

drop function if exists public.join_class_by_code(text, text);
drop function if exists public.join_class_by_code(text, text, boolean);

create or replace function public.join_class_by_code(
  p_code         text,
  p_display_name text default null,
  p_consent      boolean default true
)
returns table(class_id uuid, class_name text)
language plpgsql
security definer
set search_path = public
as $fn$
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

  -- Prune stale rate-limit records older than 24 hours
  delete from public.class_join_attempts
   where attempted_at < now() - interval '24 hours';

  select count(*) into v_recent
    from public.class_join_attempts
   where user_id = v_uid
     and attempted_at > now() - interval '15 minutes';

  if v_recent >= 8 then
    raise exception 'Too many class code attempts. Please wait 15 minutes.';
  end if;

  insert into public.class_join_attempts (user_id, attempted_at)
  values (v_uid, now());

  v_code := upper(trim(coalesce(p_code, '')));
  if length(v_code) < 4 or length(v_code) > 12 then
    raise exception 'Invalid class code';
  end if;

  select c.id, c.name into v_class_id, v_name
    from public.classes c
   where c.code = v_code;

  if v_class_id is null then
    raise exception 'Invalid class code';
  end if;

  insert into public.class_members (class_id, student_id, display_name, consent_given, consent_at)
  values (
    v_class_id,
    v_uid,
    substr(nullif(trim(p_display_name), ''), 1, 80),
    true,
    now()
  )
  on conflict (class_id, student_id) do update
     set display_name  = excluded.display_name,
         consent_given = true,
         consent_at    = now();

  return query select v_class_id, v_name;
end;
$fn$;

revoke all on function public.join_class_by_code(text, text, boolean) from public, anon;
grant execute on function public.join_class_by_code(text, text, boolean) to authenticated, service_role;

-- Scope teacher visibility strictly to the track(s) of classes/assignments the student joined
drop policy if exists "teacher reads roster accuracy"       on public.accuracy;
drop policy if exists "teacher reads roster mistakes"       on public.mistakes;
drop policy if exists "teacher reads roster chapter visits" on public.chapter_visits;
drop policy if exists "teacher reads roster profile"        on public.profiles;
drop policy if exists "teachers_read_scoped_class_accuracy" on public.accuracy;
drop policy if exists "teachers_read_scoped_class_mistakes" on public.mistakes;
drop policy if exists "teachers_read_scoped_class_visits"   on public.chapter_visits;

create policy "teachers_read_scoped_class_accuracy" on public.accuracy
  for select to authenticated using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = accuracy.user_id
         and cm.consent_given = true
         and c.owner_id = auth.uid()
         and (
           c.track = accuracy.track
           or exists (
             select 1 from public.assignments a
              where a.class_id = c.id and a.track = accuracy.track
           )
         )
    )
  );

create policy "teachers_read_scoped_class_mistakes" on public.mistakes
  for select to authenticated using (
    mistakes.deleted_at is null
    and exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = mistakes.user_id
         and cm.consent_given = true
         and c.owner_id = auth.uid()
         and (
           c.track = mistakes.view_id
           or exists (
             select 1 from public.assignments a
              where a.class_id = c.id and a.track = mistakes.view_id
           )
         )
    )
  );

create policy "teachers_read_scoped_class_visits" on public.chapter_visits
  for select to authenticated using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = chapter_visits.user_id
         and cm.consent_given = true
         and c.owner_id = auth.uid()
         and (
           c.track = chapter_visits.track
           or exists (
             select 1 from public.assignments a
              where a.class_id = c.id and a.track = chapter_visits.track
           )
         )
    )
  );

create policy "teacher reads roster profile" on public.profiles
  for select to authenticated using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = profiles.user_id
         and cm.consent_given = true
         and c.owner_id = auth.uid()
    )
  );

-- ── 2. Server-Verified Assignment Submissions & HMAC Certificates (WP-44) ──────────────
create table if not exists public.assignment_signing_secrets (
  id         smallint primary key default 1 check (id = 1),
  secret_hex text not null,
  created_at timestamptz not null default now()
);
alter table public.assignment_signing_secrets enable row level security;
-- Zero policies on assignment_signing_secrets: inaccessible to anon & authenticated clients.

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
create index if not exists idx_assignment_submissions_student
  on public.assignment_submissions (student_id, created_at desc);
create index if not exists idx_assignment_submissions_assignment
  on public.assignment_submissions (assignment_id);

alter table public.assignment_submissions enable row level security;

drop policy if exists "student reads own submissions"   on public.assignment_submissions;
drop policy if exists "teacher reads class submissions" on public.assignment_submissions;

create policy "student reads own submissions" on public.assignment_submissions
  for select to authenticated using (auth.uid() = student_id);

create policy "teacher reads class submissions" on public.assignment_submissions
  for select to authenticated using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = assignment_submissions.student_id
         and cm.consent_given = true
         and c.owner_id = auth.uid()
         and (
           c.id = assignment_submissions.class_id
           or c.track = assignment_submissions.track
           or exists (
             select 1 from public.assignments a
              where a.class_id = c.id
                and (a.id = assignment_submissions.assignment_id or a.track = assignment_submissions.track)
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
returns table(submission_id uuid, hmac_sig text, verify_code text)
language plpgsql
security definer
set search_path = public, extensions
as $fn$
declare
  v_uid     uuid := auth.uid();
  v_sub_id  uuid := gen_random_uuid();
  v_track   text := lower(trim(coalesce(p_track, '')));
  v_keys    text := substr(trim(coalesce(p_assignment_keys, '')), 1, 2000);
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
    insert into public.assignment_signing_secrets (id, secret_hex)
    values (1, v_secret)
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
    select 1
      from public.assignments a
      join public.class_members cm on cm.class_id = a.class_id
     where a.id = p_assignment_id and cm.student_id = v_uid
  ) then
    insert into public.assignment_completions (assignment_id, student_id, completed_at)
    values (p_assignment_id, v_uid, now())
    on conflict (assignment_id, student_id) do update set completed_at = now();
  end if;

  return query select
    v_sub_id,
    v_sig,
    ('CS-VERIFIED-' || v_sub_id::text || '-' || upper(substr(v_sig, 1, 16)))::text;
end;
$fn$;

revoke all on function public.submit_verified_assignment(text, text, integer, integer, jsonb, uuid, uuid) from public, anon;
grant execute on function public.submit_verified_assignment(text, text, integer, integer, jsonb, uuid, uuid) to authenticated, service_role;

create or replace function public.verify_assignment_certificate(
  p_submission_id uuid,
  p_sig_prefix    text
)
returns table(
  valid        boolean,
  student_id   uuid,
  track        text,
  score        integer,
  total        integer,
  submitted_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $fn$
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

  select * into v_row
    from public.assignment_submissions s
   where s.id = p_submission_id;

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
$fn$;

revoke all on function public.verify_assignment_certificate(uuid, text) from public, anon;
grant execute on function public.verify_assignment_certificate(uuid, text) to authenticated, service_role;

-- ── 3. Automated SAR Checkout Entitlements & Webhook Idempotency (WP-45) ───────────────
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

alter table public.ai_plans
  add column if not exists provider              text default null,
  add column if not exists external_customer_id  text default null,
  add column if not exists external_sub_id       text default null,
  add column if not exists daily_credits         integer not null default 20,
  add column if not exists trial_ends_at         timestamptz default null,
  add column if not exists cancel_at_period_end  boolean not null default false;

drop policy if exists "own ai plan" on public.ai_plans;
create policy "own ai plan" on public.ai_plans
  for select to authenticated using (auth.uid() = user_id);
-- Zero client INSERT/UPDATE/DELETE policies on ai_plans (mutated strictly by billing-webhook service_role).

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
-- Zero client policies on billing_webhook_events (service_role only).

-- ── 4. Cookieless Item Calibration Telemetry & 30-Day Error Auto-Pruning (WP-46) ───────
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
-- Zero SELECT policies on item_calibration_telemetry (aggregate write-only via RPC).

create or replace function public.log_item_calibration(
  p_track       text,
  p_item_id     text,
  p_correct     boolean,
  p_dwell_ms    integer,
  p_rapid_guess boolean default false,
  p_theta_est   real default null
)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
begin
  if p_track is null or length(trim(p_track)) = 0 or p_item_id is null or length(trim(p_item_id)) = 0 then
    return;
  end if;
  insert into public.item_calibration_telemetry (track, item_id, correct, dwell_ms, rapid_guess, theta_est)
  values (
    substr(lower(trim(p_track)), 1, 40),
    substr(trim(p_item_id), 1, 80),
    coalesce(p_correct, false),
    greatest(0, least(coalesce(p_dwell_ms, 0), 3600000)),
    coalesce(p_rapid_guess, false),
    case when p_theta_est is null then null else greatest(-5.0, least(5.0, p_theta_est)) end
  );
end;
$fn$;

grant execute on function public.log_item_calibration(text, text, boolean, integer, boolean, real) to anon, authenticated, service_role;

create or replace function public.prune_old_telemetry()
returns integer
language plpgsql
security definer
set search_path = public
as $fn$
declare
  v_err_del integer := 0;
  v_cal_del integer := 0;
begin
  delete from public.client_errors
   where created_at < now() - interval '30 days';
  get diagnostics v_err_del = row_count;

  delete from public.item_calibration_telemetry
   where created_at < now() - interval '30 days';
  get diagnostics v_cal_del = row_count;

  return v_err_del + v_cal_del;
end;
$fn$;

revoke all on function public.prune_old_telemetry() from public, anon, authenticated;
grant execute on function public.prune_old_telemetry() to service_role;

-- Update log_client_error to opportunistically prune expired >30-day rows (bounded batch)
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
returns void
language plpgsql
security definer
set search_path = public
as $fn$
begin
  if p_message is null or length(trim(p_message)) = 0 then
    return;
  end if;
  delete from public.client_errors
   where id in (
     select c.id from public.client_errors c
      where c.created_at < now() - interval '30 days'
      limit 50
   );
  insert into public.client_errors (message, track, source, line, col, stack, page_url, user_agent)
  values (
    substr(p_message, 1, 2000),
    substr(p_track, 1, 40),
    substr(p_source, 1, 500),
    p_line,
    p_col,
    substr(p_stack, 1, 4000),
    substr(p_page_url, 1, 500),
    substr(p_user_agent, 1, 300)
  );
end;
$fn$;

grant execute on function public.log_client_error(text, text, text, integer, integer, text, text, text) to anon, authenticated, service_role;

do $fn$
begin
  execute $cron$
    select cron.schedule(
      'clipsat-prune-telemetry-30d',
      '17 3 * * *',
      'select public.prune_old_telemetry()'
    )
  $cron$;
exception when others then
  null;
end;
$fn$;
