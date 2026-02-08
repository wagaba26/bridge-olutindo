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

create table if not exists public.learner_progress_updates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  learner_email text not null,
  attendance_status text not null,
  class_date date not null,
  teacher_comment text not null,
  submitted_by uuid references auth.users on delete set null,
  submitted_by_role text
);

create index if not exists learner_progress_updates_email_date_idx
  on public.learner_progress_updates (learner_email, class_date desc);

alter table public.learner_progress_updates enable row level security;

create policy "Progress updates insert by staff"
  on public.learner_progress_updates
  for insert
  to authenticated
  with check ((auth.jwt() -> 'user_metadata' ->> 'primary_role') in ('admin', 'teacher'));

create policy "Progress updates view by staff"
  on public.learner_progress_updates
  for select
  to authenticated
  using ((auth.jwt() -> 'user_metadata' ->> 'primary_role') in ('admin', 'teacher'));

create table if not exists public.learner_progress_summaries (
  learner_email text primary key,
  attendance_rate int not null default 0,
  feedback_score int not null default 0,
  progress_score int not null default 0,
  last_class_date date,
  updated_at timestamptz not null default now()
);

alter table public.learner_progress_summaries enable row level security;

create policy "Progress summary upsert by staff"
  on public.learner_progress_summaries
  for all
  to authenticated
  using ((auth.jwt() -> 'user_metadata' ->> 'primary_role') in ('admin', 'teacher'))
  with check ((auth.jwt() -> 'user_metadata' ->> 'primary_role') in ('admin', 'teacher'));

create table if not exists public.staff_action_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_id uuid references auth.users on delete set null,
  actor_role text,
  action_type text not null,
  target_email text,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.staff_action_logs enable row level security;

create policy "Staff logs insert by staff"
  on public.staff_action_logs
  for insert
  to authenticated
  with check ((auth.jwt() -> 'user_metadata' ->> 'primary_role') in ('admin', 'teacher'));

create policy "Staff logs view by admins"
  on public.staff_action_logs
  for select
  to authenticated
  using ((auth.jwt() -> 'user_metadata' ->> 'primary_role') = 'admin');

create table if not exists public.security_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null,
  severity text not null default 'low',
  request_path text,
  ip_address text,
  user_agent text,
  details jsonb not null default '{}'::jsonb
);

create index if not exists security_events_created_at_idx
  on public.security_events (created_at desc);

alter table public.security_events enable row level security;

create policy "Security events view by admins"
  on public.security_events
  for select
  to authenticated
  using ((auth.jwt() -> 'user_metadata' ->> 'primary_role') = 'admin');

create policy "Security events insert by staff"
  on public.security_events
  for insert
  to authenticated
  with check ((auth.jwt() -> 'user_metadata' ->> 'primary_role') in ('admin', 'teacher'));
