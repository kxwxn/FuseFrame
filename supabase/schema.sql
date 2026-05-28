create extension if not exists "pgcrypto";

create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text unique,
  status text not null,
  plan_id text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attribution_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('visit', 'signup', 'payment')),
  anonymous_id text not null,
  user_id uuid references public.profiles(id) on delete set null,
  stripe_customer_id text,
  source text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referrer text,
  landing_page text,
  created_at timestamptz not null default now()
);

create table if not exists public.revenue_events (
  id uuid primary key default gen_random_uuid(),
  stripe_event_id text not null unique,
  stripe_customer_id text,
  user_id uuid references public.profiles(id) on delete set null,
  amount integer not null check (amount >= 0),
  currency text not null default 'usd',
  source text not null default 'direct',
  created_at timestamptz not null default now()
);

create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('stripe')),
  provider_event_id text not null,
  processed_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create index if not exists attribution_events_anonymous_id_idx on public.attribution_events (anonymous_id);
create index if not exists attribution_events_user_id_idx on public.attribution_events (user_id);
create index if not exists attribution_events_source_idx on public.attribution_events (source);
create index if not exists revenue_events_source_idx on public.revenue_events (source);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.attribution_events enable row level security;
alter table public.revenue_events enable row level security;
alter table public.webhook_events enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can read own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, coalesce(new.email, ''))
  on conflict (id) do update set email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure private.handle_new_user();
