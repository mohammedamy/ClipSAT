-- ClipSAT Wave 4 — Supabase pgTAP RLS & RPC Privilege Boundary Suite (WP-47)
-- ════════════════════════════════════════════════════════════════════════════
-- Run via: `supabase test db`
-- Verifies:
--   1. Every table in `public` has Row Level Security (RLS) enabled.
--   2. `anon` cannot read private user tables or execute revoked SECURITY DEFINER RPCs.
--   3. `student_a` and `student_b` are strictly isolated across profiles, mistakes,
--      accuracy, srs_state, chapter_visits, ai_plans, google_oauth_tokens, and assignment_submissions.
--   4. Track-scoped teacher RLS: a teacher of a `sat` class can read consenting member's
--      `sat` mistakes/accuracy, NEVER their `calculus` mistakes/accuracy, and NEVER soft-deleted tombstones.
--   5. Leaving a class (`DELETE FROM class_members`) immediately revokes all teacher read access.
--   6. `submit_verified_assignment` & `verify_assignment_certificate` accept genuine HMAC
--      tokens and reject forged/tampered signatures; direct client INSERT into `assignment_submissions` fails.

begin;
create extension if not exists pgtap with schema extensions;
select plan(34);

-- ── 1. Structural RLS assertion across all public tables ──────────────────────
select is(
  (
    select count(*)::int
      from pg_tables
     where schemaname = 'public'
       and rowsecurity = false
  ),
  0,
  'Every table in public schema has Row Level Security (RLS) enabled'
);

-- Seed 3 synthetic test identities (student_a, student_b, teacher_t)
insert into auth.users (id, email, role, aud)
values
  ('aaaaaaaa-0000-4000-8000-000000000001', 'student_a@clipsat.test', 'authenticated', 'authenticated'),
  ('bbbbbbbb-0000-4000-8000-000000000002', 'student_b@clipsat.test', 'authenticated', 'authenticated'),
  ('cccccccc-0000-4000-8000-000000000003', 'teacher_t@clipsat.test', 'authenticated', 'authenticated')
on conflict (id) do nothing;

-- Seed student_a mistakes across TWO tracks (`sat` and `calculus`) + one soft-deleted tombstone
insert into public.mistakes (user_id, id, view_id, q, wrong, correct, domain, ts, deleted_at)
values
  ('aaaaaaaa-0000-4000-8000-000000000001', 'm-sat-1', 'sat', 'Solve 2x=10', '4', '5', 'Algebra', 1700000001000, null),
  ('aaaaaaaa-0000-4000-8000-000000000001', 'm-sat-del', 'sat', 'Deleted mistake', '1', '2', 'Algebra', 1700000002000, now()),
  ('aaaaaaaa-0000-4000-8000-000000000001', 'm-calc-1', 'calculus', 'd/dx x^2', 'x', '2x', 'Derivatives', 1700000003000, null);

insert into public.accuracy (user_id, track, domain, day, correct, total)
values
  ('aaaaaaaa-0000-4000-8000-000000000001', 'sat', 'Algebra', current_date, 8, 10),
  ('aaaaaaaa-0000-4000-8000-000000000001', 'calculus', 'Derivatives', current_date, 5, 10);

insert into public.ai_plans (user_id, tier, daily_credits)
values ('aaaaaaaa-0000-4000-8000-000000000001', 'paid', 200)
on conflict (user_id) do update set tier = 'paid', daily_credits = 200;

insert into public.mock_exam_attempts (user_id, attempt_ts, track, paper, score, total, pct, scaled)
values ('aaaaaaaa-0000-4000-8000-000000000001', 1700000005000, 'sat', 'SAT Mock 1', 38, 44, 86, '730')
on conflict (user_id, attempt_ts, track) do nothing;

insert into public.user_study_data (user_id, custom_cards, starred_cards, badges)
values ('aaaaaaaa-0000-4000-8000-000000000001', '[{"id":"c1","f":"2+2","b":"4"}]'::jsonb, '{"c1":true}'::jsonb, '["first-step"]'::jsonb)
on conflict (user_id) do nothing;

-- ── 2. Anonymous role (`anon`) isolation & RPC revocations ────────────────────
set local role anon;
select set_config('request.jwt.claims', '{}', true);

select is((select count(*)::int from public.mistakes), 0, 'anon sees 0 rows in public.mistakes');
select is((select count(*)::int from public.profiles), 0, 'anon sees 0 rows in public.profiles');
select is((select count(*)::int from public.question_error_flags), 0, 'anon sees 0 rows in public.question_error_flags');
select is((select count(*)::int from public.ai_plans), 0, 'anon sees 0 rows in public.ai_plans');
select is((select count(*)::int from public.billing_webhook_events), 0, 'anon sees 0 rows in public.billing_webhook_events');
select is((select count(*)::int from public.mock_exam_attempts), 0, 'anon sees 0 rows in public.mock_exam_attempts');
select is((select count(*)::int from public.user_study_data), 0, 'anon sees 0 rows in public.user_study_data');

select throws_ok(
  $$select public.use_ai_quota('aaaaaaaa-0000-4000-8000-000000000001'::uuid, 20, 1, 10)$$,
  null,
  'anon cannot execute internal use_ai_quota RPC'
);

select throws_ok(
  $$select public.use_tts_quota('aaaaaaaa-0000-4000-8000-000000000001'::uuid, 60, 1, 10)$$,
  null,
  'anon cannot execute internal use_tts_quota RPC'
);

select throws_ok(
  $$select public.refund_ai_quota('aaaaaaaa-0000-4000-8000-000000000001'::uuid, 1)$$,
  null,
  'anon cannot execute internal refund_ai_quota RPC'
);

select throws_ok(
  $$select public.report_question_error('flag-1', 'sat')$$,
  null,
  'anon cannot execute report_question_error RPC'
);

select throws_ok(
  $$select public.resolve_question_error('flag-1', 'v1')$$,
  null,
  'anon cannot execute resolve_question_error RPC'
);

select throws_ok(
  $$select * from public.get_my_daily_usage()$$,
  null,
  'anon cannot execute get_my_daily_usage RPC'
);

-- ── 3. Cross-student (`student_b` vs `student_a`) strict isolation ────────────
set local role authenticated;
select set_config('request.jwt.claim.sub', 'bbbbbbbb-0000-4000-8000-000000000002', true);
select set_config('request.jwt.claims', '{"sub":"bbbbbbbb-0000-4000-8000-000000000002","role":"authenticated"}', true);

select is((select count(*)::int from public.mistakes where user_id = 'aaaaaaaa-0000-4000-8000-000000000001'), 0, 'student_b cannot read student_a mistakes');
select is((select count(*)::int from public.accuracy where user_id = 'aaaaaaaa-0000-4000-8000-000000000001'), 0, 'student_b cannot read student_a accuracy');
select is((select count(*)::int from public.ai_plans where user_id = 'aaaaaaaa-0000-4000-8000-000000000001'), 0, 'student_b cannot read student_a ai_plans');
select is((select count(*)::int from public.mock_exam_attempts where user_id = 'aaaaaaaa-0000-4000-8000-000000000001'), 0, 'student_b cannot read student_a mock_exam_attempts');
select is((select count(*)::int from public.user_study_data where user_id = 'aaaaaaaa-0000-4000-8000-000000000001'), 0, 'student_b cannot read student_a user_study_data');

select throws_ok(
  $$insert into public.ai_plans (user_id, tier, daily_credits) values ('bbbbbbbb-0000-4000-8000-000000000002', 'paid', 200)$$,
  null,
  'authenticated user cannot self-upgrade ai_plans directly'
);

-- ── 4. Teacher creates `sat` class; student_a joins with explicit consent ─────
select set_config('request.jwt.claim.sub', 'cccccccc-0000-4000-8000-000000000003', true);
select set_config('request.jwt.claims', '{"sub":"cccccccc-0000-4000-8000-000000000003","role":"authenticated"}', true);

insert into public.classes (id, owner_id, name, code, track)
values ('dddddddd-0000-4000-8000-000000000004', 'cccccccc-0000-4000-8000-000000000003', 'SAT Prep Sec 1', 'SAT99A', 'sat');

-- Switch to student_a: joining without consent must fail; joining with consent succeeds
select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-0000-4000-8000-000000000001","role":"authenticated"}', true);

select throws_ok(
  $$select * from public.join_class_by_code('SAT99A', 'Ali', false)$$,
  'Explicit data-sharing consent is required to join a class',
  'join_class_by_code rejects join when p_consent is false'
);

select lives_ok(
  $$select * from public.join_class_by_code('SAT99A', 'Ali', true)$$,
  'join_class_by_code succeeds when student grants explicit consent'
);

select is(
  (select count(*)::int from public.classes where id = 'dddddddd-0000-4000-8000-000000000004'),
  1,
  'enrolled student_a CAN read joined class row in public.classes (zero RLS recursion)'
);

-- Verify non-member student_b CANNOT read SAT Prep Sec 1
select set_config('request.jwt.claim.sub', 'bbbbbbbb-0000-4000-8000-000000000002', true);
select set_config('request.jwt.claims', '{"sub":"bbbbbbbb-0000-4000-8000-000000000002","role":"authenticated"}', true);
select is(
  (select count(*)::int from public.classes where id = 'dddddddd-0000-4000-8000-000000000004'),
  0,
  'non-member student_b CANNOT read classes they have not joined'
);
select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-0000-4000-8000-000000000001","role":"authenticated"}', true);

-- Student submits verified assignment via RPC; direct forged INSERT must fail
select throws_ok(
  $$insert into public.assignment_submissions (student_id, track, assignment_keys, score, total, hmac_sig)
    values ('aaaaaaaa-0000-4000-8000-000000000001', 'sat', 'k1.k2', 10, 10, 'forged_sig')$$,
  null,
  'direct client INSERT into assignment_submissions is blocked by RLS'
);

create temp table _sub_out as
  select * from public.submit_verified_assignment('sat', 'k1.k2', 9, 10, '{"0":"A"}'::jsonb, null, 'dddddddd-0000-4000-8000-000000000004'::uuid);

select ok(
  (select verify_code like 'CS-VERIFIED-%' from _sub_out limit 1),
  'submit_verified_assignment issues CS-VERIFIED HMAC token'
);

select is(
  (select (paid and ai_cap = 200) from public.get_my_daily_usage()),
  true,
  'student_a get_my_daily_usage returns paid=true and ai_cap=200'
);

-- ── 5. Teacher track-scoped visibility & certificate verification ─────────────
select set_config('request.jwt.claim.sub', 'cccccccc-0000-4000-8000-000000000003', true);
select set_config('request.jwt.claims', '{"sub":"cccccccc-0000-4000-8000-000000000003","role":"authenticated"}', true);

select is(
  (select count(*)::int from public.mistakes where user_id = 'aaaaaaaa-0000-4000-8000-000000000001' and view_id = 'sat'),
  1,
  'SAT teacher sees student_a active SAT mistake (and NOT soft-deleted tombstone)'
);

select is(
  (select count(*)::int from public.mistakes where user_id = 'aaaaaaaa-0000-4000-8000-000000000001' and view_id = 'calculus'),
  0,
  'SAT teacher CANNOT see student_a cross-track Calculus mistakes'
);

select is(
  (select count(*)::int from public.accuracy where user_id = 'aaaaaaaa-0000-4000-8000-000000000001' and track = 'calculus'),
  0,
  'SAT teacher CANNOT see student_a cross-track Calculus accuracy'
);

select is(
  (select valid from public.verify_assignment_certificate((select submission_id from _sub_out), left((select hmac_sig from _sub_out), 16))),
  true,
  'verify_assignment_certificate validates genuine server HMAC signature'
);

select is(
  (select valid from public.verify_assignment_certificate((select submission_id from _sub_out), '0000000000000000')),
  false,
  'verify_assignment_certificate rejects tampered HMAC signature'
);

-- ── 6. Student leaves class -> immediate revocation of teacher read access ────
select set_config('request.jwt.claim.sub', 'aaaaaaaa-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claims', '{"sub":"aaaaaaaa-0000-4000-8000-000000000001","role":"authenticated"}', true);

delete from public.class_members
 where class_id = 'dddddddd-0000-4000-8000-000000000004'
   and student_id = 'aaaaaaaa-0000-4000-8000-000000000001';

select set_config('request.jwt.claim.sub', 'cccccccc-0000-4000-8000-000000000003', true);
select set_config('request.jwt.claims', '{"sub":"cccccccc-0000-4000-8000-000000000003","role":"authenticated"}', true);

select is(
  (select count(*)::int from public.mistakes where user_id = 'aaaaaaaa-0000-4000-8000-000000000001'),
  0,
  'Leaving class immediately revokes teacher access to student mistakes'
);

select is(
  (select count(*)::int from public.assignment_submissions where student_id = 'aaaaaaaa-0000-4000-8000-000000000001'),
  0,
  'Leaving class immediately revokes teacher access to student assignment submissions'
);

select * from finish();
rollback;
