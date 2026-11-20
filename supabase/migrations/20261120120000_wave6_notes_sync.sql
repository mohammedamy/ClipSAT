-- ClipSAT Wave 6 — Chapter Sticky Notes Cross-Device Sync (`user_study_data.notes`)
-- Idempotent migration. Apply via `supabase db query --linked --project-ref ynnqrxeprxhtdimzwxwx -f ...`

alter table public.user_study_data
  add column if not exists notes jsonb not null default '{}'::jsonb;

do $$
begin
  if not exists (
    select 1
      from pg_constraint
     where conname = 'user_study_data_notes_size_chk'
       and conrelid = 'public.user_study_data'::regclass
  ) then
    alter table public.user_study_data
      add constraint user_study_data_notes_size_chk
      check (octet_length(notes::text) <= 131072);
  end if;
end $$;
