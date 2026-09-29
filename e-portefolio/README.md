# e-portefolio

Site portfolio (Vue 3 + Vite). Les projets et formations se gèrent sans toucher au code.

## Ajouter un projet (dans les fichiers)

```
npm run new:project -- "Nom du projet"
```

Crée `src/content/projects/nom-du-projet/project.json` (copie de `_modele/project.json`, qui montre tous les types de blocs).
Mets les images dans le même dossier et référence-les par leur nom de fichier.
Une page = un en-tête (`header`) + des `sections`, chacune contenant des blocs :
`callout` (texte), `heading` (sous-titre), `cards` (grille de cartes), `image`, `button`.
Les six projets d'origine sont écrits dans ce format et servent de modèles.

En pratique, le plus simple est d'utiliser l'éditeur en ligne (`/admin`, voir plus bas).

## Ajouter une formation

Ajoute un bloc dans `src/content/formations.json` (ordre du fichier = ordre d'affichage) :

```json
{
  "icon": "🎓",
  "title": "Diplôme",
  "subtitle": "École — Ville",
  "period": "2020 — 2023",
  "text": "Description facultative.",
  "tags": [{ "label": "Étiquette" }, { "label": "Un lien", "url": "https://..." }]
}
```

## Prévisualiser et publier

```
npm install
npm run dev       # prévisualisation locale
npm run deploy    # build + publication de dist/ sur la branche gp-page
```

`npm run deploy` publie uniquement le build sur la branche `gp-page` (GitHub Pages).
Pense aussi à commit/push les changements de contenu sur `master`.

## Ajouter du contenu depuis le site (sans commit)

Page `/admin` : connexion, puis ajout / modification / suppression de projets et formations, avec envoi d'images.
Les données sont stockées dans Supabase et visibles immédiatement (pas de rebuild, pas de commit).
Seul le compte admin peut écrire (règles côté serveur dans `supabase/setup.sql`).

### Mise en place (une seule fois)

1. Crée un projet gratuit sur https://supabase.com.
2. **Authentication > Users > Add user** : crée ton compte (email + mot de passe, coche « Auto Confirm »).
   **Authentication > Sign In / Providers** : désactive « Allow new users to sign up ».
3. **SQL Editor** : ouvre `supabase/setup.sql`, remplace `TON_EMAIL` par l'email du compte, exécute.
4. **Project Settings > API** : copie l'URL et la clé `anon` dans `e-portefolio/.env.local` (voir `.env.example`).
5. `npm run deploy` une fois pour publier le site avec cette configuration.
6. Va sur `https://drag0nol.github.io/admin`.

La clé `anon` est publique par conception. Ne mets jamais la clé `service_role` dans le site.


### L'éditeur de projets

Dans `/admin` > Projets :
- **Tous les projets** (ceux du dépôt aussi) se modifient. La version modifiée remplace l'original ; « Rétablir l'original » l'annule.
- **Dupliquer** copie un projet comme point de départ d'une nouvelle page.
- Une page se compose d'une carte (page Projets), d'un en-tête (bandeau d'avertissement, apprentissages critiques, badges) et de sections faites de blocs : texte, sous-titre, cartes (2 ou 3 colonnes, icône, liste, sous-groupes), images avec légende, bouton.
- **Aperçu** montre la page exactement comme sur le site avant d'enregistrer.
- `**gras**` fonctionne dans les textes.
