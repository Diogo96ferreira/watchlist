create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  name text not null,
  avatar_url text,
  bio text,
  location text
);

create table if not exists watches (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model text not null,
  reference text not null,
  image_url text,
  has_3d boolean default false,
  model_3d_url text
);

create table if not exists user_watches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  watch_id uuid not null references watches(id) on delete cascade,
  status text not null check (status in ('Owned', 'Wishlist', 'Sold')),
  created_at timestamptz not null default now()
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null,
  watch_id uuid references watches(id) on delete set null,
  created_at timestamptz not null default now()
);
