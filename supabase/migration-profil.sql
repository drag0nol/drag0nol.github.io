-- À exécuter UNE FOIS dans Supabase (SQL Editor) si tu avais déjà lancé setup.sql :
-- autorise le type de contenu « profile » (profil & contact de la page d'accueil).
alter table public.content drop constraint if exists content_kind_check;
alter table public.content
  add constraint content_kind_check check (kind in ('project', 'formation', 'profile'));
