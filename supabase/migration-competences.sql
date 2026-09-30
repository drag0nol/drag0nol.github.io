-- À exécuter UNE FOIS dans Supabase (SQL Editor).
-- Autorise les types de contenu « profile » et « competences », et lève la liste fermée
-- pour ne plus avoir besoin de migration à l'avenir.
alter table public.content drop constraint if exists content_kind_check;
alter table public.content
  add constraint content_kind_check check (kind ~ '^[a-z][a-z-]*$');
