-- À exécuter UNE FOIS dans Supabase : SQL Editor > New query > coller > Run.
-- AVANT de lancer : chercher/remplacer TON_EMAIL par l'email de ton compte admin (partout dans le fichier).

-- Contenu ajouté depuis le site (projets et formations)
create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('project', 'formation', 'profile')),
  slug text,
  data jsonb not null,
  created_at timestamptz not null default now(),
  unique (kind, slug)
);

alter table public.content enable row level security;

-- Tout le monde peut lire (le site est public)
drop policy if exists "content_read" on public.content;
create policy "content_read" on public.content
  for select using (true);

-- Seul le propriétaire (connecté avec cet email) peut écrire
drop policy if exists "content_owner_write" on public.content;
create policy "content_owner_write" on public.content
  for all to authenticated
  using (lower(auth.jwt() ->> 'email') = lower('ethann.cochenet@gmail.com'))
  with check (lower(auth.jwt() ->> 'email') = lower('ethann.cochenet@gmail.com'));

-- Images : bucket public en lecture, écriture réservée au propriétaire
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

drop policy if exists "images_owner_insert" on storage.objects;
create policy "images_owner_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'images' and lower(auth.jwt() ->> 'email') = lower('ethann.cochenet@gmail.com'));

drop policy if exists "images_owner_update" on storage.objects;
create policy "images_owner_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'images' and lower(auth.jwt() ->> 'email') = lower('ethann.cochenet@gmail.com'));

drop policy if exists "images_owner_delete" on storage.objects;
create policy "images_owner_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'images' and lower(auth.jwt() ->> 'email') = lower('ethann.cochenet@gmail.com'));
