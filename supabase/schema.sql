create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  email text,
  primary_role text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id);

create policy "Profiles can be inserted by owner"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,
  full_name text,
  email text,
  phone text,
  focus text,
  organization text,
  message text,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.leads enable row level security;

create policy "Leads can be inserted by anyone"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null,
  category text not null,
  focus text not null,
  summary text,
  duration text,
  mode text,
  highlights text[] not null default '{}',
  is_active boolean not null default true
);

alter table public.programs enable row level security;

create policy "Programs are viewable when active"
  on public.programs
  for select
  to anon, authenticated
  using (is_active = true);

create unique index if not exists programs_slug_key on public.programs (slug);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users on delete cascade,
  program_id uuid references public.programs on delete set null,
  status text not null default 'draft',
  notes text
);

alter table public.applications enable row level security;

create policy "Applications are viewable by owner"
  on public.applications
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Applications are insertable by owner"
  on public.applications
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Applications are updatable by owner"
  on public.applications
  for update
  to authenticated
  using (auth.uid() = user_id);
