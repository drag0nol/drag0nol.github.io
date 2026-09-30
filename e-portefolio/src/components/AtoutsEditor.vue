<script setup>
// Édite en place l'objet `form` (même format que src/content/atouts.json).
import EdField from './admin/EdField.vue'
import EdPanel from './admin/EdPanel.vue'
import EdItem from './admin/EdItem.vue'
import EdAdd from './admin/EdAdd.vue'
import { move, duplicate } from './admin/ed.js'

defineProps({ form: { type: Object, required: true } })

const LAYOUTS = {
  cards: 'Cartes avec barre de niveau (outils, soft skills, certifications…)',
  languages: 'Langues (grand drapeau + niveau)',
}
const newItem = (layout) =>
  layout === 'languages'
    ? { icon: '🌍', title: '', tagline: '', detail: '', level: 50, levelLabel: '' }
    : { icon: '⭐', title: '', description: '', level: 50, levelLabel: '' }
const newCategory = () => ({ label: '', heading: '', layout: 'cards', items: [newItem('cards')] })

// Curseur et champ numérique partagent la même valeur ; vide = pas de barre.
const setLevel = (it, v) => (it.level = v === '' ? '' : Math.min(100, Math.max(0, Number(v))))
const levelOf = (it) => (it.level === '' || it.level === undefined ? 0 : it.level)
</script>

<template>
  <div class="space-y-6">
    <EdPanel title="Page">
      <div class="grid md:grid-cols-2 gap-3">
        <EdField label="Titre de la page"><input v-model="form.title" class="ed-input" /></EdField>
        <EdField label="Sous-titre" hint="Facultatif"><input v-model="form.subtitle" class="ed-input" /></EdField>
      </div>
    </EdPanel>

    <EdPanel title="Catégories" description="Chaque catégorie est un onglet de la page « Mes atouts ».">
      <EdItem
        v-for="(cat, ci) in form.categories"
        :key="ci"
        :title="cat.label"
        :subtitle="cat.items.length + ' élément(s) · ' + (cat.layout === 'languages' ? 'langues' : 'cartes')"
        empty-title="Catégorie sans nom"
        :open="!cat.label"
        :first="ci === 0"
        :last="ci === form.categories.length - 1"
        :confirm="'Supprimer la catégorie « ' + (cat.label || 'sans nom') + ' » et ses ' + cat.items.length + ' élément(s) ?'"
        @up="move(form.categories, ci, -1)"
        @down="move(form.categories, ci, 1)"
        @duplicate="duplicate(form.categories, ci)"
        @remove="form.categories.splice(ci, 1)"
      >
        <div class="grid md:grid-cols-2 gap-3">
          <EdField label="Nom de l'onglet"><input v-model="cat.label" class="ed-input" placeholder="Outils numériques" /></EdField>
          <EdField label="Titre au-dessus des éléments"><input v-model="cat.heading" class="ed-input" placeholder="Outils Numériques & Technologies" /></EdField>
        </div>
        <EdField label="Mise en page">
          <select v-model="cat.layout" class="ed-input">
            <option v-for="(name, key) in LAYOUTS" :key="key" :value="key">{{ name }}</option>
          </select>
        </EdField>

        <div class="space-y-3">
          <EdItem
            v-for="(it, i) in cat.items"
            :key="i"
            nested
            :icon="it.icon"
            :title="it.title"
            :subtitle="it.levelLabel ? it.levelLabel + (it.level !== '' && it.level !== undefined ? ' · ' + it.level + '%' : '') : ''"
            :open="!it.title"
            :first="i === 0"
            :last="i === cat.items.length - 1"
            confirm="Supprimer cet élément ?"
            @up="move(cat.items, i, -1)"
            @down="move(cat.items, i, 1)"
            @duplicate="duplicate(cat.items, i)"
            @remove="cat.items.splice(i, 1)"
          >
            <div class="grid grid-cols-[5rem_1fr] gap-3">
              <EdField label="Icône"><input v-model="it.icon" class="ed-input" placeholder="💻" /></EdField>
              <EdField :label="cat.layout === 'languages' ? 'Langue' : 'Titre'">
                <input v-model="it.title" class="ed-input" :placeholder="cat.layout === 'languages' ? 'Anglais' : 'Git / GitHub'" />
              </EdField>
            </div>

            <template v-if="cat.layout === 'languages'">
              <EdField label="Phrase principale"><input v-model="it.tagline" class="ed-input" placeholder="Langue maternelle" /></EdField>
              <EdField label="Détail"><input v-model="it.detail" class="ed-input" placeholder="Maîtrise complète à l'écrit et à l'oral" /></EdField>
            </template>
            <EdField v-else label="Description"><textarea v-model="it.description" rows="3" class="ed-input"></textarea></EdField>

            <div class="grid sm:grid-cols-[1fr_6rem_1fr] items-end gap-3">
              <EdField label="Niveau (curseur)">
                <input type="range" min="0" max="100" :value="levelOf(it)" :style="{ '--pct': levelOf(it) + '%' }" class="w-full" @input="setLevel(it, $event.target.value)" />
              </EdField>
              <EdField label="Niveau (%)"><input :value="it.level" type="number" min="0" max="100" placeholder="—" class="ed-input" @input="setLevel(it, $event.target.value)" /></EdField>
              <EdField label="Texte du niveau" :hint="cat.layout === 'languages' ? 'Affiché tel quel' : 'Le % est ajouté automatiquement'">
                <input v-model="it.levelLabel" class="ed-input" :placeholder="cat.layout === 'languages' ? 'Intermédiaire (B2)' : 'Avancé'" />
              </EdField>
            </div>
            <p class="ed-hint">Champ « Niveau (%) » vide = pas de barre.</p>
          </EdItem>
          <EdAdd @click="cat.items.push(newItem(cat.layout))">Élément</EdAdd>
        </div>
      </EdItem>

      <EdAdd big @click="form.categories.push(newCategory())">Nouvelle catégorie (onglet)</EdAdd>
    </EdPanel>
  </div>
</template>
