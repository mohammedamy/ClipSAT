-- Wave 0 Security Lockdown (2026-11-01)
-- 1. Drop legacy try_use_ai_quota & restrict use_ai_quota strictly to service_role
-- 2. Lock down question_error_flags (no world-readable SELECT, bounded snapshots, service_role-only resolve)
-- 3. Harden join_class_by_code (auth required, code length bounds, display_name cap)
-- 4. Add self-service PDPL / GDPR account deletion RPC (delete_my_account)

do $$
begin
  if exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'try_use_ai_quota'
  ) then
    execute 'revoke all on function public.try_use_ai_quota(uuid, integer) from public, anon, authenticated';
    execute 'drop function if exists public.try_use_ai_quota(uuid, integer)';
  end if;
end $$;

do $$
begin
  if exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'use_ai_quota'
  ) then
    execute 'revoke all on function public.use_ai_quota(uuid, integer, integer, integer) from public, anon, authenticated';
    execute 'grant execute on function public.use_ai_quota(uuid, integer, integer, integer) to service_role';
  end if;
end $$;

alter table if exists public.question_error_flags enable row level security;
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
  if p_flag_id is null or length(trim(p_flag_id)) = 0 then
    return;
  end if;
  v_snap := coalesce(p_question_snapshot, '{}'::jsonb);
  if octet_length(v_snap::text) > 16384 then
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

create or replace function public.join_class_by_code(p_code text, p_display_name text default null)
returns table(class_id uuid, class_name text) as $$
declare
  v_class_id uuid;
  v_name     text;
  v_code     text;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  v_code := upper(trim(coalesce(p_code, '')));
  if length(v_code) < 4 or length(v_code) > 12 then
    raise exception 'Invalid class code';
  end if;
  select id, name into v_class_id, v_name from public.classes where code = v_code;
  if v_class_id is null then
    raise exception 'Invalid class code';
  end if;
  insert into public.class_members(class_id, student_id, display_name)
    values (v_class_id, auth.uid(), left(nullif(trim(p_display_name), ''), 80))
    on conflict on constraint class_members_pkey do update set display_name = excluded.display_name;
  return query select v_class_id, v_name;
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.join_class_by_code(text, text) from public, anon;
grant execute on function public.join_class_by_code(text, text) to authenticated, service_role;

create or replace function public.delete_my_account()
returns void as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$ language plpgsql security definer set search_path = public, auth;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated, service_role;
