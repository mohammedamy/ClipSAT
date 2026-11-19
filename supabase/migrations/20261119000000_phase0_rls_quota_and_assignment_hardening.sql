-- ClipSAT Phase 0 — RLS, Separate AI/TTS Quotas, Refunds & Student Class Visibility
-- ════════════════════════════════════════════════════════════════════════════════
-- Safe, idempotent migration. Apply via `supabase db push` or SQL Editor.

-- 1. Fix P0 Student Classroom Visibility (zero-recursion SECURITY DEFINER helper)
create or replace function public.is_enrolled_in_class(p_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.class_members cm
     where cm.class_id = p_class_id
       and cm.student_id = auth.uid()
  );
$$;

revoke all on function public.is_enrolled_in_class(uuid) from public, anon;
grant execute on function public.is_enrolled_in_class(uuid) to authenticated, service_role;

drop policy if exists "enrolled students see joined classes" on public.classes;
create policy "enrolled students see joined classes" on public.classes
  for select
  to authenticated
  using (public.is_enrolled_in_class(id));

-- 2. Separate TTS daily quota counter from AI Tutor calls so audio never locks out AI Tutor
alter table public.ai_usage
  add column if not exists tts_calls integer not null default 0;

-- Upgrade use_ai_quota to honor ai_plans.daily_credits as single source of truth
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

-- Refund AI quota when upstream LLM provider fails (5xx/429/timeout)
create or replace function public.refund_ai_quota(
  p_user_id uuid,
  p_cost integer
) returns integer as $$
declare
  v_used integer;
begin
  update public.ai_usage
     set calls = greatest(0, calls - greatest(0, coalesce(p_cost, 1))),
         updated_at = now()
   where user_id = p_user_id
     and day = current_date
  returning calls into v_used;
  return coalesce(v_used, 0);
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.refund_ai_quota(uuid, integer) from public, anon, authenticated;
grant execute on function public.refund_ai_quota(uuid, integer) to service_role;

-- Dedicated TTS quota counter (uses ai_usage.tts_calls, never touches ai_usage.calls)
create or replace function public.use_tts_quota(
  p_user_id uuid,
  p_base_cap integer,
  p_cost integer,
  p_paid_multiplier integer
) returns table (allowed boolean, used integer, cap integer, paid boolean) as $$
declare
  v_paid boolean := false;
  v_cap  integer;
  v_used integer;
begin
  select exists (
    select 1 from public.ai_plans
     where user_id = p_user_id
       and tier = 'paid'
       and (paid_until is null or paid_until > now())
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

create or replace function public.refund_tts_quota(
  p_user_id uuid,
  p_cost integer
) returns integer as $$
declare
  v_used integer;
begin
  update public.ai_usage
     set tts_calls = greatest(0, tts_calls - greatest(0, coalesce(p_cost, 1))),
         updated_at = now()
   where user_id = p_user_id
     and day = current_date
  returning tts_calls into v_used;
  return coalesce(v_used, 0);
end;
$$ language plpgsql security definer set search_path = public;

revoke all on function public.refund_tts_quota(uuid, integer) from public, anon, authenticated;
grant execute on function public.refund_tts_quota(uuid, integer) to service_role;

-- Read-only self-service daily quota + plan summary for /account/ & AI Tutor pill
create or replace function public.get_my_daily_usage()
returns table (
  tier text,
  paid boolean,
  paid_until timestamptz,
  trial_ends_at timestamptz,
  cancel_at_period_end boolean,
  ai_used integer,
  ai_cap integer,
  tts_used integer,
  tts_cap integer
) as $$
declare
  v_uid   uuid := auth.uid();
  v_plan  public.ai_plans%rowtype;
  v_usage public.ai_usage%rowtype;
  v_paid  boolean := false;
  v_aicap integer := 20;
begin
  if v_uid is null then
    raise exception 'Authentication required';
  end if;

  select * into v_plan from public.ai_plans where user_id = v_uid;
  select * into v_usage from public.ai_usage where user_id = v_uid and day = current_date;

  v_paid := (v_plan.tier = 'paid' and (v_plan.paid_until is null or v_plan.paid_until > now()));
  if v_paid then
    v_aicap := greatest(200, coalesce(v_plan.daily_credits, 200));
  else
    v_aicap := greatest(20, coalesce(v_plan.daily_credits, 20));
  end if;

  return query select
    coalesce(v_plan.tier, 'free'),
    v_paid,
    v_plan.paid_until,
    v_plan.trial_ends_at,
    coalesce(v_plan.cancel_at_period_end, false),
    coalesce(v_usage.calls, 0),
    v_aicap,
    coalesce(v_usage.tts_calls, 0),
    case when v_paid then 600 else 60 end;
end;
$$ language plpgsql stable security definer set search_path = public;

revoke all on function public.get_my_daily_usage() from public, anon;
grant execute on function public.get_my_daily_usage() to authenticated, service_role;
