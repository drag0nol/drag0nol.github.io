# e-portefolio

Site portfolio (Vue 3 + Vite). Les projets et formations se gèrent sans toucher au code.

## Ajouter un projet

```
npm run new:project -- "Nom du projet"
```

Cela crée `src/content/projects/nom-du-projet/project.json`.

1. Copie tes images (png, jpg, webp, gif...) dans ce même dossier.
2. Édite `project.json` (voir `src/content/projects/_modele/project.json`) :
   - `title`, `category`, `summary`, `tags` : carte sur la page Projets
   - `status` : badge optionnel (ex. `"EN COURS"`)
   - `cover` : image de la carte (par défaut la première image du dossier)
   - `subtitle`, `meta` : en-tête de la page du projet
   - `sections` : liste de blocs `title`, `text` (texte ou liste de paragraphes), `bullets`, `images` (`{ "file": "capture.png", "caption": "..." }`)
   - `links` : boutons `{ "label", "url" }`
   - `order` : ordre d'affichage (petit nombre = en premier)
   - `"publie": false` masque le projet
3. Supprimer le dossier supprime le projet.

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
