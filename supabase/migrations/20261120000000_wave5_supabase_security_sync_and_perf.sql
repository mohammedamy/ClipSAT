-- ClipSAT Wave 5 — Supabase Security Advisors, Cross-Device Sync Tables & RLS InitPlan Optimization
-- ══════════════════════════════════════════════════════════════════════════════════════════════════
-- 100% idempotent migration. Apply via `supabase db query --linked --project-ref ynnqrxeprxhtdimzwxwx -f ...`
-- or Supabase SQL Editor.

-- 1. Drop obsolete RPC (security advisor: callable by anon/authenticated) & lock trigger fn
do $$
begin
  execute 'revoke all on function public.try_use_ai_quota(uuid, integer) from public, anon, authenticated';
exception when undefined_function then
  null;
end $$;

drop function if exists public.try_use_ai_quota(uuid, integer);

do $$
begin
  execute 'revoke all on function public.handle_new_user() from public, anon, authenticated';
exception when undefined_function then
  null;
end $$;

-- 2. New cross-device sync table: mock_exam_attempts (CBT simulator history)
create table if not exists public.mock_exam_attempts (
  user_id    uuid not null references auth.users(id) on delete cascade,
  attempt_ts bigint not null,
  track      text not null,
  paper      text not null default '',
  score      real not null default 0,
  total      integer not null check (total > 0 and total <= 500),
  pct        integer not null check (pct >= 0 and pct <= 100),
  scaled     text not null default '',
  created_at timestamptz not null default now(),
  primary key (user_id, attempt_ts, track)
);

alter table public.mock_exam_attempts enable row level security;

create index if not exists idx_mock_exam_attempts_user_ts
  on public.mock_exam_attempts (user_id, attempt_ts desc);

drop policy if exists "own mock exam attempts" on public.mock_exam_attempts;
create policy "own mock exam attempts" on public.mock_exam_attempts
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "teachers_read_scoped_mock_attempts" on public.mock_exam_attempts;
create policy "teachers_read_scoped_mock_attempts" on public.mock_exam_attempts
  for select to authenticated
  using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = mock_exam_attempts.user_id
         and cm.consent_given = true
         and c.owner_id = (select auth.uid())
         and (
           c.track = mock_exam_attempts.track
           or exists (
             select 1
               from public.assignments a
              where a.class_id = c.id
                and a.track = mock_exam_attempts.track
           )
         )
    )
  );

-- 3. New cross-device sync table: user_study_data (custom cards, starred cards, badges — owner-only)
create table if not exists public.user_study_data (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  custom_cards  jsonb not null default '[]'::jsonb check (octet_length(custom_cards::text) <= 262144),
  starred_cards jsonb not null default '{}'::jsonb check (octet_length(starred_cards::text) <= 65536),
  badges        jsonb not null default '[]'::jsonb check (octet_length(badges::text) <= 32768),
  updated_at    timestamptz not null default now()
);

alter table public.user_study_data enable row level security;

drop policy if exists "own study data" on public.user_study_data;
create policy "own study data" on public.user_study_data
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- 4. RLS InitPlan optimization ((select auth.uid()) + `to authenticated`) across existing policies
drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "teacher reads roster profile" on public.profiles;
create policy "teacher reads roster profile" on public.profiles
  for select to authenticated
  using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = profiles.user_id
         and cm.consent_given = true
         and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "own mistakes" on public.mistakes;
create policy "own mistakes" on public.mistakes
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "teachers_read_scoped_class_mistakes" on public.mistakes;
create policy "teachers_read_scoped_class_mistakes" on public.mistakes
  for select to authenticated
  using (
    mistakes.deleted_at is null
    and exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = mistakes.user_id
         and cm.consent_given = true
         and c.owner_id = (select auth.uid())
         and (
           c.track = mistakes.view_id
           or exists (
             select 1
               from public.assignments a
              where a.class_id = c.id
                and a.track = mistakes.view_id
           )
         )
    )
  );

drop policy if exists "own srs state" on public.srs_state;
create policy "own srs state" on public.srs_state
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "own chapter visits" on public.chapter_visits;
create policy "own chapter visits" on public.chapter_visits
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "teachers_read_scoped_class_visits" on public.chapter_visits;
create policy "teachers_read_scoped_class_visits" on public.chapter_visits
  for select to authenticated
  using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = chapter_visits.user_id
         and cm.consent_given = true
         and c.owner_id = (select auth.uid())
         and (
           c.track = chapter_visits.track
           or exists (
             select 1
               from public.assignments a
              where a.class_id = c.id
                and a.track = chapter_visits.track
           )
         )
    )
  );

drop policy if exists "own accuracy" on public.accuracy;
create policy "own accuracy" on public.accuracy
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "teachers_read_scoped_class_accuracy" on public.accuracy;
create policy "teachers_read_scoped_class_accuracy" on public.accuracy
  for select to authenticated
  using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = accuracy.user_id
         and cm.consent_given = true
         and c.owner_id = (select auth.uid())
         and (
           c.track = accuracy.track
           or exists (
             select 1
               from public.assignments a
              where a.class_id = c.id
                and a.track = accuracy.track
           )
         )
    )
  );

drop policy if exists "own classes" on public.classes;
create policy "own classes" on public.classes
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "enrolled students see joined classes" on public.classes;
create policy "enrolled students see joined classes" on public.classes
  for select to authenticated
  using (public.is_enrolled_in_class(id));

drop policy if exists "own membership" on public.class_members;
create policy "own membership" on public.class_members
  for select to authenticated
  using ((select auth.uid()) = student_id);

drop policy if exists "leave class" on public.class_members;
create policy "leave class" on public.class_members
  for delete to authenticated
  using ((select auth.uid()) = student_id);

drop policy if exists "teacher sees roster" on public.class_members;
create policy "teacher sees roster" on public.class_members
  for select to authenticated
  using (
    exists (
      select 1
        from public.classes c
       where c.id = class_id
         and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "teacher removes member" on public.class_members;
create policy "teacher removes member" on public.class_members
  for delete to authenticated
  using (
    exists (
      select 1
        from public.classes c
       where c.id = class_id
         and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "teacher manages own assignments" on public.assignments;
create policy "teacher manages own assignments" on public.assignments
  for all to authenticated
  using (
    exists (
      select 1
        from public.classes c
       where c.id = assignments.class_id
         and c.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
        from public.classes c
       where c.id = assignments.class_id
         and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "student reads class assignments" on public.assignments;
create policy "student reads class assignments" on public.assignments
  for select to authenticated
  using (
    exists (
      select 1
        from public.class_members cm
       where cm.class_id = assignments.class_id
         and cm.student_id = (select auth.uid())
    )
  );

drop policy if exists "student manages own completion" on public.assignment_completions;
create policy "student manages own completion" on public.assignment_completions
  for all to authenticated
  using ((select auth.uid()) = student_id)
  with check (
    (select auth.uid()) = student_id
    and exists (
      select 1
        from public.assignments a
        join public.class_members cm on cm.class_id = a.class_id
       where a.id = assignment_completions.assignment_id
         and cm.student_id = (select auth.uid())
    )
  );

drop policy if exists "teacher reads roster completions" on public.assignment_completions;
create policy "teacher reads roster completions" on public.assignment_completions
  for select to authenticated
  using (
    exists (
      select 1
        from public.assignments a
        join public.classes c on c.id = a.class_id
       where a.id = assignment_completions.assignment_id
         and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "student reads own submissions" on public.assignment_submissions;
create policy "student reads own submissions" on public.assignment_submissions
  for select to authenticated
  using ((select auth.uid()) = student_id);

drop policy if exists "teacher reads class submissions" on public.assignment_submissions;
create policy "teacher reads class submissions" on public.assignment_submissions
  for select to authenticated
  using (
    exists (
      select 1
        from public.class_members cm
        join public.classes c on c.id = cm.class_id
       where cm.student_id = assignment_submissions.student_id
         and cm.consent_given = true
         and c.owner_id = (select auth.uid())
         and (
           c.id = assignment_submissions.class_id
           or c.track = assignment_submissions.track
           or exists (
             select 1
               from public.assignments a
              where a.class_id = c.id
                and (a.id = assignment_submissions.assignment_id or a.track = assignment_submissions.track)
           )
         )
    )
  );

drop policy if exists "own ai plan" on public.ai_plans;
create policy "own ai plan" on public.ai_plans
  for select to authenticated
  using ((select auth.uid()) = user_id);

notify pgrst, 'reload schema';
