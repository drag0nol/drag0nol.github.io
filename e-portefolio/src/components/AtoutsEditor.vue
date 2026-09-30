<script setup>
// Édite en place l'objet `form` (même format que src/content/atouts.json).
defineProps({ form: { type: Object, required: true } })

const input = 'w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400'
const small = 'px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm text-white'
const danger = 'px-2 py-1 rounded bg-red-600/80 hover:bg-red-600 text-sm text-white'
const btn = 'px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold'
const box = 'bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4 space-y-3'

const clone = (o) => JSON.parse(JSON.stringify(o))
function move(list, i, d) {
  const j = i + d
  if (j < 0 || j >= list.length) return
  ;[list[i], list[j]] = [list[j], list[i]]
}
const duplicate = (list, i) => list.splice(i + 1, 0, clone(list[i]))

const LAYOUTS = {
  cards: 'Cartes avec barre de niveau (outils, soft skills…)',
  languages: 'Langues (grand drapeau + niveau)',
}
const newItem = (layout) =>
  layout === 'languages'
    ? { icon: '🌍', title: '', tagline: '', detail: '', level: 50, levelLabel: '' }
    : { icon: '⭐', title: '', description: '', level: 50, levelLabel: '' }
const newCategory = () => ({ label: '', heading: '', layout: 'cards', items: [newItem('cards')] })

// Curseur et champ numérique partagent la même valeur ; vide = pas de barre.
const setLevel = (it, v) => (it.level = v === '' ? '' : Math.min(100, Math.max(0, Number(v))))
</script>

<template>
  <div class="space-y-8">
    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Page</legend>
      <input v-model="form.title" placeholder="Titre de la page" :class="input" />
      <input v-model="form.subtitle" placeholder="Sous-titre (facultatif)" :class="input" />
    </fieldset>

    <p class="text-sm text-slate-400">
      Chaque catégorie devient un onglet de la page « Mes atouts ». Choisis sa mise en page :
      cartes avec barre de niveau, ou langues avec drapeau.
    </p>

    <details v-for="(cat, ci) in form.categories" :key="ci" :class="box + ' !border-indigo-500/40'" :open="!cat.label">
      <summary class="cursor-pointer font-semibold text-indigo-300">
        Catégorie : {{ cat.label || 'sans nom' }}
        <span class="text-slate-400 font-normal">({{ cat.items.length }} éléments)</span>
      </summary>

      <div class="space-y-3 mt-3">
        <div class="flex items-center gap-2">
          <input v-model="cat.label" placeholder="Nom de l'onglet (ex. Outils numériques)" :class="input" />
          <button type="button" :class="small" @click="move(form.categories, ci, -1)">↑</button>
          <button type="button" :class="small" @click="move(form.categories, ci, 1)">↓</button>
          <button type="button" :class="small" @click="duplicate(form.categories, ci)">Dupliquer</button>
          <button type="button" :class="danger" @click="form.categories.splice(ci, 1)">✕</button>
        </div>
        <input v-model="cat.heading" placeholder="Titre au-dessus des éléments (ex. Outils Numériques & Technologies)" :class="input" />
        <select v-model="cat.layout" :class="input">
          <option v-for="(name, key) in LAYOUTS" :key="key" :value="key">{{ name }}</option>
        </select>

        <div v-for="(it, i) in cat.items" :key="i" :class="box + ' bg-slate-900/50'">
          <div class="flex items-center gap-2">
            <input v-model="it.icon" placeholder="💻" :class="input + ' !w-20'" />
            <input v-model="it.title" :placeholder="cat.layout === 'languages' ? 'Langue (ex. Anglais)' : 'Titre (ex. Git / GitHub)'" :class="input" />
            <button type="button" :class="small" @click="move(cat.items, i, -1)">↑</button>
            <button type="button" :class="small" @click="move(cat.items, i, 1)">↓</button>
            <button type="button" :class="small" @click="duplicate(cat.items, i)">Dupliquer</button>
            <button type="button" :class="danger" @click="cat.items.splice(i, 1)">✕</button>
          </div>

          <template v-if="cat.layout === 'languages'">
            <input v-model="it.tagline" placeholder="Phrase principale (ex. Langue maternelle)" :class="input" />
            <input v-model="it.detail" placeholder="Détail (ex. Maîtrise complète à l'écrit et à l'oral)" :class="input" />
          </template>
          <textarea v-else v-model="it.description" rows="3" placeholder="Description" :class="input"></textarea>

          <div class="grid grid-cols-[1fr_5rem_1fr] items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              :value="it.level === '' ? 0 : it.level"
              class="w-full"
              @input="setLevel(it, $event.target.value)"
            />
            <input :value="it.level" type="number" min="0" max="100" placeholder="—" :class="input" @input="setLevel(it, $event.target.value)" />
            <input v-model="it.levelLabel" :placeholder="cat.layout === 'languages' ? 'Niveau (ex. Intermédiaire (B2))' : 'Niveau (ex. Avancé)'" :class="input" />
          </div>
          <p class="text-xs text-slate-400">
            Niveau en % pour la barre (laisser vide = pas de barre).
            {{ cat.layout === 'languages' ? 'Le texte du niveau s\'affiche tel quel.' : 'Le pourcentage est ajouté automatiquement au texte du niveau.' }}
          </p>
        </div>
        <button type="button" :class="small" @click="cat.items.push(newItem(cat.layout))">+ Élément</button>
      </div>
    </details>

    <button type="button" :class="btn" @click="form.categories.push(newCategory())">+ Nouvelle catégorie (onglet)</button>
  </div>
</template>
