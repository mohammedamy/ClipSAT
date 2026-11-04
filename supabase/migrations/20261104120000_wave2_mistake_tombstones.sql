-- Wave 2 (WP-26): Soft-delete tombstones for cross-device mistake clears
alter table public.mistakes
  add column if not exists deleted_at timestamptz default null;

create index if not exists idx_mistakes_user_active
  on public.mistakes (user_id)
  where deleted_at is null;
