-- Wave 1 Vault OAuth Encryption, RPC Hardening & K-12 PDPL/COPPA Compliance (2026-11-01)
-- Self-contained & idempotent: safe to run in full in the Supabase SQL Editor.

create schema if not exists vault;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

do $fn$
begin
  execute 'create extension if not exists supabase_vault with schema vault';
exception when others then
  raise notice 'supabase_vault not available on this instance (%); using private pgcrypto AES-256 fallback.', sqlerrm;
end;
$fn$;

-- Locked-down private key table used only if supabase_vault (vault.secrets) is absent
create schema if not exists app_private;
revoke all on schema app_private from public, anon, authenticated;

create table if not exists app_private.oauth_cipher_keys (
  id         smallint primary key default 1 check (id = 1),
  secret_key text not null default encode(extensions.gen_random_bytes(32), 'hex'),
  created_at timestamptz not null default now()
);
revoke all on table app_private.oauth_cipher_keys from public, anon, authenticated;
insert into app_private.oauth_cipher_keys (id) values (1) on conflict (id) do nothing;

-- Ensure google_oauth_tokens exists with Vault + AES-256 columns and RLS enabled
create table if not exists public.google_oauth_tokens (
  user_id                 uuid primary key references auth.users(id) on delete cascade,
  refresh_token           text,
  vault_secret_id         uuid,
  encrypted_refresh_token bytea,
  updated_at              timestamptz not null default now()
);
alter table public.google_oauth_tokens enable row level security;

alter table public.google_oauth_tokens
  add column if not exists vault_secret_id uuid,
  add column if not exists encrypted_refresh_token bytea,
  alter column refresh_token drop not null;

-- Migrate any existing plaintext refresh_token rows into vault.secrets (or AES-256 fallback) and clear plaintext column
do $fn$
declare
  r record;
  v_sid uuid;
  v_has_vault boolean := (to_regclass('vault.secrets') is not null);
  v_key text;
begin
  select secret_key into v_key from app_private.oauth_cipher_keys where id = 1;
  for r in
    select user_id, refresh_token, vault_secret_id
    from public.google_oauth_tokens
    where refresh_token is not null and length(refresh_token) > 0
  loop
    if v_has_vault then
      if r.vault_secret_id is not null then
        perform vault.update_secret(r.vault_secret_id, r.refresh_token, 'google_oauth_' || r.user_id::text, 'ClipSAT Google OAuth refresh token');
        v_sid := r.vault_secret_id;
      else
        v_sid := vault.create_secret(r.refresh_token, 'google_oauth_' || r.user_id::text, 'ClipSAT Google OAuth refresh token');
      end if;
      update public.google_oauth_tokens
         set vault_secret_id = v_sid,
             encrypted_refresh_token = null,
             refresh_token = null,
             updated_at = now()
       where user_id = r.user_id;
    else
      update public.google_oauth_tokens
         set encrypted_refresh_token = extensions.pgp_sym_encrypt(r.refresh_token, v_key, 'cipher-algo=aes256'),
             refresh_token = null,
             updated_at = now()
       where user_id = r.user_id;
    end if;
  end loop;
end;
$fn$;

-- Drop direct client write policies so plaintext refresh_token can never be inserted directly
drop policy if exists "user stores own google token" on public.google_oauth_tokens;
drop policy if exists "user replaces own google token" on public.google_oauth_tokens;

-- Authenticated user stores/rotates their own Google OAuth refresh token into Vault (or AES-256 fallback)
create or replace function public.upsert_google_refresh_token(p_refresh_token text)
returns void
language plpgsql
security definer
set search_path = public, vault, extensions, app_private
as $fn$
declare
  v_uid uuid := auth.uid();
  v_existing_sid uuid;
  v_new_sid uuid;
  v_cipher bytea := null;
  v_key text;
begin
  if v_uid is null then
    raise exception 'Authentication required';
  end if;
  if p_refresh_token is null or length(trim(p_refresh_token)) < 10 or length(p_refresh_token) > 4096 then
    raise exception 'Invalid refresh token';
  end if;

  if to_regclass('vault.secrets') is not null then
    select vault_secret_id into v_existing_sid
      from public.google_oauth_tokens
     where user_id = v_uid;

    if v_existing_sid is not null then
      perform vault.update_secret(v_existing_sid, p_refresh_token, 'google_oauth_' || v_uid::text, 'ClipSAT Google OAuth refresh token');
      v_new_sid := v_existing_sid;
    else
      v_new_sid := vault.create_secret(p_refresh_token, 'google_oauth_' || v_uid::text, 'ClipSAT Google OAuth refresh token');
    end if;
  else
    select secret_key into v_key from app_private.oauth_cipher_keys where id = 1;
    v_cipher := extensions.pgp_sym_encrypt(p_refresh_token, v_key, 'cipher-algo=aes256');
  end if;

  insert into public.google_oauth_tokens (user_id, refresh_token, vault_secret_id, encrypted_refresh_token, updated_at)
  values (v_uid, null, v_new_sid, v_cipher, now())
  on conflict (user_id) do update
     set refresh_token = null,
         vault_secret_id = excluded.vault_secret_id,
         encrypted_refresh_token = excluded.encrypted_refresh_token,
         updated_at = now();
end;
$fn$;

revoke all on function public.upsert_google_refresh_token(text) from public, anon;
grant execute on function public.upsert_google_refresh_token(text) to authenticated, service_role;

-- Service-role-only reader for supabase/functions/google-token
create or replace function public.get_google_refresh_token_admin(p_user_id uuid)
returns text
language plpgsql
security definer
set search_path = public, vault, extensions, app_private
as $fn$
declare
  v_sid uuid;
  v_cipher bytea;
  v_legacy text;
  v_decrypted text;
  v_key text;
begin
  select vault_secret_id, encrypted_refresh_token, refresh_token
    into v_sid, v_cipher, v_legacy
    from public.google_oauth_tokens
   where user_id = p_user_id;

  if v_sid is not null and to_regclass('vault.decrypted_secrets') is not null then
    execute 'select decrypted_secret from vault.decrypted_secrets where id = $1'
       into v_decrypted
      using v_sid;
    if v_decrypted is not null then
      return v_decrypted;
    end if;
  end if;

  if v_cipher is not null then
    select secret_key into v_key from app_private.oauth_cipher_keys where id = 1;
    return extensions.pgp_sym_decrypt(v_cipher, v_key);
  end if;

  return v_legacy;
end;
$fn$;

revoke all on function public.get_google_refresh_token_admin(uuid) from public, anon, authenticated;
grant execute on function public.get_google_refresh_token_admin(uuid) to service_role;

-- Service-role-only cleanup when Google revokes a refresh token (invalid_grant)
create or replace function public.delete_google_refresh_token_admin(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public, vault
as $fn$
declare
  v_sid uuid;
begin
  select vault_secret_id into v_sid
    from public.google_oauth_tokens
   where user_id = p_user_id;

  if v_sid is not null and to_regclass('vault.secrets') is not null then
    execute 'delete from vault.secrets where id = $1' using v_sid;
  end if;

  delete from public.google_oauth_tokens where user_id = p_user_id;
end;
$fn$;

revoke all on function public.delete_google_refresh_token_admin(uuid) from public, anon, authenticated;
grant execute on function public.delete_google_refresh_token_admin(uuid) to service_role;

-- Ensure question_error_flags exists with RLS enabled and no public SELECT policy
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
drop policy if exists "anyone reads question error flags" on public.question_error_flags;

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
returns void
language plpgsql
security definer
set search_path = public
as $fn$
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
    substr(p_flag_id, 1, 200),
    substr(coalesce(p_track, 'home'), 1, 40),
    substr(p_topic_id, 1, 80),
    substr(coalesce(p_source_type, 'question'), 1, 60),
    substr(coalesce(p_item_id, ''), 1, 120),
    substr(coalesce(p_category, 'other'), 1, 40),
    substr(p_note, 1, 1000),
    v_snap,
    substr(p_content_signature, 1, 64),
    'open',
    1,
    now(),
    now()
  )
  on conflict (flag_id) do update set
    report_count = least(public.question_error_flags.report_count + 1, 10000),
    updated_at   = now();
end;
$fn$;

revoke all on function public.report_question_error(text, text, text, text, text, text, text, jsonb, text) from public, anon;
grant execute on function public.report_question_error(text, text, text, text, text, text, text, jsonb, text) to authenticated, service_role;

-- Self-service PDPL / GDPR / COPPA erasure: purge Vault secret + cascade auth.users deletion
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth, vault
as $fn$
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
  if v_sid is not null and to_regclass('vault.secrets') is not null then
    execute 'delete from vault.secrets where id = $1' using v_sid;
  end if;
  delete from auth.users where id = v_uid;
end;
$fn$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated, service_role;
