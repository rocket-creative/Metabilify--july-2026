-- Metablify project inquiries (run in Supabase SQL editor)
create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  organization text not null,
  interest text not null check (interest in ('services', 'platform', 'collaboration')),
  message text not null,
  ip text
);

alter table public.project_inquiries enable row level security;

-- Service role inserts from the API; no public policies needed for anon.
-- Optional: allow authenticated staff to read later.
create policy "Service role full access"
  on public.project_inquiries
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create index if not exists project_inquiries_created_at_idx
  on public.project_inquiries (created_at desc);
