-- ============================================
-- HOGALALLA — Supabase setup
-- Run this once in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric not null,
  old_price numeric,
  badge text,
  sizes text[] default '{S,M,L,XL}',
  kind text default 'tee',
  graphic text default 'circle',
  image_url text,
  description text,
  created_at timestamptz default now()
);

-- Reviews table
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  name text not null,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

-- Row Level Security: allow everyone to read (so customers see products/reviews),
-- and allow anyone with your site's public key to write (fine for a small store
-- run by one person — this is the same trust level as your admin password gate).
alter table products enable row level security;
alter table reviews enable row level security;

create policy "Public read products" on products for select using (true);
create policy "Public insert products" on products for insert with check (true);
create policy "Public delete products" on products for delete using (true);

create policy "Public read reviews" on reviews for select using (true);
create policy "Public insert reviews" on reviews for insert with check (true);

-- ============================================
-- Storage bucket for product photos
-- Do this part in the UI instead (SQL editor can't create buckets):
-- 1. Go to Storage (left sidebar) → New Bucket
-- 2. Name it exactly: product-images
-- 3. Toggle "Public bucket" ON (so images load on your site)
-- 4. Create
-- ============================================
