-- AI tutor quota v2: daily CREDITS instead of a flat call count.
--   free user  : 20 credits/day. A text question costs 1, a photo/PDF/camera/DOCX question costs 2
--                -> 20 text questions, OR 10 attachment questions, OR any mix, per day.
--   paid user  : the same allowance x10 (200 credits/day).
-- No other limits. ai_usage.calls now stores credits used (column name kept for compatibility).

-- Who is a paid subscriber. Written ONLY by service_role (you / a future billing webhook);
-- deliberately no RLS policies, so a client can never grant itself a plan.
create table if not exists public.ai_plans (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  tier       text not null default 'free' check (tier in ('free', 'paid')),
  paid_until timestamptz,                       -- null = no expiry
  updated_at timestamptz not null default now()
);
alter table public.ai_plans enable row level security;

-- Atomic check-and-spend. Returns whether the call is allowed plus the numbers the UI needs.
create or replace function public.use_ai_quota(
  p_user_id uuid,
  p_base_cap integer,
  p_cost integer,
  p_paid_multiplier integer
) returns table (allowed boolean, used integer, cap integer, paid boolean) as $$
declare
  v_paid boolean;
  v_cap  integer;
  v_used integer;
begin
  select exists (
    select 1 from public.ai_plans
    where user_id = p_user_id and tier = 'paid' and (paid_until is null or paid_until > now())
  ) into v_paid;

  v_cap := p_base_cap * case when v_paid then p_paid_multiplier else 1 end;

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

-- Only the Edge Function (service_role) may call it.
revoke all on function public.use_ai_quota(uuid, integer, integer, integer) from public, anon, authenticated;
grant execute on function public.use_ai_quota(uuid, integer, integer, integer) to service_role;
