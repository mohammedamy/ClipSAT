-- Wave 1 Vault OAuth Encryption, RPC Hardening & K-12 PDPL/COPPA Compliance (2026-11-01)
-- 1. Enable Supabase Vault (pgsodium AEAD) & migrate google_oauth_tokens.refresh_token into vault.secrets
-- 2. Remove direct client INSERT/UPDATE policies on google_oauth_tokens; replace with Vault-backed RPCs
-- 3. Revoke anon from report_question_error & tighten snapshot constraint to 8 KB
-- 4. Cascade Vault secret cleanup inside delete_my_account()

create extension if not exists supabase_vault with schema vault;

alter table if exists public.google_oauth_tokens
  add column if not exists vault_secret_id uuid,
  alter column refresh_token drop not null;

-- Migrate any existing plaintext refresh_token rows into vault.secrets and clear plaintext column
do $$
declare
  r record;
  v_sid uuid;
begin
  if exists (select 1 from pg_namespace where nspname = 'vault') then
    for r in
      select user_id, refresh_token, vault_secret_id
      from public.google_oauth_tokens
      where refresh_token is not null and length(refresh_token) > 0
    loop
      if r.vault_secret_id is not null then
        perform vault.update_secret(r.vault_secret_id, r.refresh_token, 'google_oauth_' || r.user_id::text, 'ClipSAT Google OAuth refresh token');
        v_sid := r.vault_secret_id;
      else
        v_sid := vault.create_secret(r.refresh_token, 'google_oauth_' || r.user_id::text, 'ClipSAT Google OAuth refresh token');
      end if;
      update public.google_oauth_tokens
         set vault_secret_id = v_sid,
             refresh_token = null,
             updated_at = now()
       where user_id = r.user_id;
    end loop;
  end if;
end $$;

-- Drop direct client write policies so plaintext refresh_token can never be inserted directly
drop policy if exists "user stores own google token" on public.google_oauth_tokens;
drop policy if exists "user replaces own google token" on public.google_oauth_tokens;

-- Authenticated user stores/rotates their own Google OAuth refresh token directly into Vault
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

-- Service-role-only reader for supabase/functions/google-token
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

-- Service-role-only cleanup when Google revokes a refresh token (invalid_grant)
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

-- Tighten report_question_error: 8 KB snapshot constraint + authenticated/service_role only
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

-- Self-service PDPL / GDPR / COPPA erasure: purge Vault secret + cascade auth.users deletion
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
