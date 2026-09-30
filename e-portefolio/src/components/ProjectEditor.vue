<script setup>
// Éditeur de page projet : édite en place l'objet `form` (même format que project.json).
import { ref, computed } from 'vue'
import ListInput from './ListInput.vue'
import PageRenderer from './PageRenderer.vue'
import CardEditor from './CardEditor.vue'
import MaxHeightInput from './MaxHeightInput.vue'
import EdField from './admin/EdField.vue'
import EdPanel from './admin/EdPanel.vue'
import EdItem from './admin/EdItem.vue'
import EdRow from './admin/EdRow.vue'
import EdAdd from './admin/EdAdd.vue'
import { move, duplicate, clone } from './admin/ed.js'
import { normalizeProject, resolverFor } from '@/content'

const props = defineProps({
  form: { type: Object, required: true },
  baseSlug: { type: String, default: '' }, // dossier des images du dépôt, si projet du dépôt
  upload: { type: Function, required: true }, // (File) => Promise<url>
})
const emit = defineEmits(['error'])

const resolve = computed(() => resolverFor(props.baseSlug))
const imgSrc = (img) => img.url || (img.file && (/^(https?:)?\/\//.test(img.file) ? img.file : resolve.value(img.file)))

const BLOCK_TYPES = [
  ['callout', 'Texte'],
  ['heading', 'Sous-titre'],
  ['cards', 'Cartes'],
  ['image', 'Image'],
  ['carousel', 'Carrousel'],
  ['button', 'Bouton'],
]
const BLOCK_LABEL = Object.fromEntries(BLOCK_TYPES)
const BLOCK_ICON = { callout: '📝', heading: '🔤', cards: '🗂️', image: '🖼️', carousel: '🎞️', button: '🔘' }
const SLIDE_LABEL = { image: 'Image', card: 'Carte', text: 'Texte' }

const newCard = () => ({ icon: '', iconPosition: 'left', iconSize: '3xl', title: '', subtitle: '', text: '', items: [], bullet: 'dot', size: 'base' })
const newBlock = (type) =>
  ({
    heading: { type, text: '' },
    callout: { type, tone: 'indigo', size: 'lg', title: '', paragraphs: [], items: [], bullet: 'arrow' },
    cards: { type, columns: 2, style: 'plain', cards: [newCard()] },
    image: { type, images: [] },
    carousel: { type, perView: 1, autoplay: 0, cardStyle: 'plain', slides: [] },
    button: { type, icon: '📂', label: '', url: '' },
  })[type]
const newSlide = (type) =>
  type === 'card' ? { type, ...newCard() } : { type, tone: 'indigo', title: '', paragraphs: [], items: [], bullet: 'arrow' }

// Résumé d'un bloc affiché dans l'en-tête replié
const blockSummary = (b) =>
  ({
    heading: b.text,
    callout: b.title || (b.paragraphs && b.paragraphs[0]) || '',
    cards: (b.cards || []).length + ' carte(s)',
    image: (b.images || []).length + ' image(s)',
    carousel: (b.slides || []).length + ' diapositive(s)',
    button: b.label,
  })[b.type] || ''

async function uploadInto(ev, list, make) {
  try {
    for (const file of ev.target.files) list.push(make(await props.upload(file)))
  } catch (e) {
    emit('error', "Envoi de l'image impossible : " + e.message)
  }
  ev.target.value = ''
}

const h = computed(() => props.form.header)
const toggleNotice = () => (h.value.notice = h.value.notice ? undefined : { tone: 'amber', icon: '⚠️', title: '', text: '' })
const toggleCriteria = () =>
  (h.value.criteria = h.value.criteria ? undefined : { title: 'Apprentissages Critiques', items: [{ code: '', text: '' }] })

const preview = ref(false)
const previewProject = computed(() =>
  normalizeProject({ ...clone(props.form), title: props.form.title || h.value.title }, props.baseSlug || 'apercu', resolve.value),
)
</script>

<template>
  <div class="space-y-6">
    <!-- Carte -->
    <EdPanel title="Carte sur la page « Projets »" description="Ce qui s'affiche dans la liste des projets.">
      <EdField label="Titre de la carte"><input v-model="form.title" class="ed-input" required /></EdField>
      <div class="grid md:grid-cols-2 gap-3">
        <EdField label="Catégorie"><input v-model="form.category" class="ed-input" placeholder="SAE — Jeu" /></EdField>
        <EdField label="Badge" hint="Facultatif, ex. EN COURS"><input v-model="form.status" class="ed-input" /></EdField>
      </div>
      <EdField label="Résumé"><textarea v-model="form.summary" rows="2" class="ed-input"></textarea></EdField>
      <EdField label="Technologies" hint="Séparées par des virgules"><ListInput v-model="form.tags" mode="comma" :rows="1" /></EdField>
      <div class="grid sm:grid-cols-[1fr_6rem_auto] items-end gap-3">
        <EdField label="Couleur">
          <select v-model="form.tone" class="ed-input">
            <option value="indigo">Indigo</option>
            <option value="amber">Ambre (en cours)</option>
          </select>
        </EdField>
        <EdField label="Ordre"><input v-model.number="form.order" type="number" class="ed-input" /></EdField>
        <label class="flex items-center gap-2 pb-2 text-sm text-slate-300"><input v-model="form.publie" type="checkbox" /> Publié</label>
      </div>
    </EdPanel>

    <!-- En-tête -->
    <EdPanel title="En-tête de la page">
      <EdField label="Petit texte au-dessus du titre"><input v-model="h.kicker" class="ed-input" placeholder="Projet étudiant — SAE" /></EdField>
      <div class="grid md:grid-cols-[1fr_auto] items-end gap-3">
        <EdField label="Titre de la page"><input v-model="h.title" class="ed-input" /></EdField>
        <label class="flex items-center gap-2 pb-2 text-sm text-slate-300"><input v-model="h.smallTitle" type="checkbox" /> Titre plus petit</label>
      </div>
      <EdField label="Sous-titre"><input v-model="h.subtitle" class="ed-input" /></EdField>

      <div class="flex flex-wrap gap-2">
        <button type="button" class="ed-btn ed-btn-ghost ed-btn-sm" @click="toggleNotice">{{ h.notice ? '− Retirer le bandeau d’avertissement' : '+ Bandeau d’avertissement' }}</button>
        <button type="button" class="ed-btn ed-btn-ghost ed-btn-sm" @click="toggleCriteria">{{ h.criteria ? '− Retirer les apprentissages critiques' : '+ Apprentissages critiques' }}</button>
      </div>

      <div v-if="h.notice" class="ed-card p-4 space-y-3">
        <p class="ed-label !mb-0">Bandeau d'avertissement</p>
        <div class="grid grid-cols-[5rem_1fr] gap-3">
          <EdField label="Icône"><input v-model="h.notice.icon" class="ed-input" /></EdField>
          <EdField label="Titre"><input v-model="h.notice.title" class="ed-input" /></EdField>
        </div>
        <EdField label="Texte"><textarea v-model="h.notice.text" rows="2" class="ed-input"></textarea></EdField>
      </div>

      <div v-if="h.criteria" class="ed-card p-4 space-y-3">
        <EdField label="Titre de l'encadré des apprentissages critiques"><input v-model="h.criteria.title" class="ed-input" /></EdField>
        <EdRow
          v-for="(it, i) in h.criteria.items"
          :key="i"
          :first="i === 0"
          :last="i === h.criteria.items.length - 1"
          @up="move(h.criteria.items, i, -1)"
          @down="move(h.criteria.items, i, 1)"
          @remove="h.criteria.items.splice(i, 1)"
        >
          <div class="grid grid-cols-[7rem_1fr] gap-3">
            <EdField label="Code"><input v-model="it.code" class="ed-input" placeholder="AC11.01" /></EdField>
            <EdField label="Intitulé"><input v-model="it.text" class="ed-input" /></EdField>
          </div>
        </EdRow>
        <EdAdd @click="h.criteria.items.push({ code: '', text: '' })">Ligne</EdAdd>
      </div>

      <div class="space-y-3">
        <EdField label="Badges d'infos">
          <select v-model="h.factsStyle" class="ed-input sm:!w-auto">
            <option value="plain">Simples (icône + texte)</option>
            <option value="chips">Étiquettes encadrées</option>
          </select>
        </EdField>
        <EdRow v-for="(f, i) in h.facts" :key="i" :first="i === 0" :last="i === h.facts.length - 1" @up="move(h.facts, i, -1)" @down="move(h.facts, i, 1)" @remove="h.facts.splice(i, 1)">
          <div class="grid grid-cols-[5rem_1fr] gap-3">
            <EdField label="Icône"><input v-model="f.icon" class="ed-input" placeholder="👥" /></EdField>
            <EdField label="Texte" hint="**gras** possible"><input v-model="f.text" class="ed-input" placeholder="**Équipe de 3** personnes" /></EdField>
          </div>
        </EdRow>
        <EdAdd @click="h.facts.push({ icon: '', text: '' })">Badge</EdAdd>
      </div>
    </EdPanel>

    <!-- Sections -->
    <EdPanel title="Contenu de la page" description="Des sections, chacune composée de blocs.">
      <template #actions>
        <EdAdd @click="form.sections.push({ title: '', blocks: [] })">Nouvelle section</EdAdd>
      </template>

      <EdItem
        v-for="(s, si) in form.sections"
        :key="si"
        :title="s.title"
        :subtitle="s.blocks.length + ' bloc(s)'"
        empty-title="Section sans titre"
        :open="!s.title"
        :first="si === 0"
        :last="si === form.sections.length - 1"
        :confirm="'Supprimer la section « ' + (s.title || 'sans titre') + ' » et ses ' + s.blocks.length + ' bloc(s) ?'"
        @up="move(form.sections, si, -1)"
        @down="move(form.sections, si, 1)"
        @duplicate="duplicate(form.sections, si)"
        @remove="form.sections.splice(si, 1)"
      >
        <EdField label="Titre de la section"><input v-model="s.title" class="ed-input" placeholder="Partie 1 : Concept & Objectif" /></EdField>

        <EdItem
          v-for="(b, bi) in s.blocks"
          :key="bi"
          nested
          :icon="BLOCK_ICON[b.type]"
          :title="BLOCK_LABEL[b.type]"
          :subtitle="blockSummary(b)"
          :first="bi === 0"
          :last="bi === s.blocks.length - 1"
          confirm="Supprimer ce bloc ?"
          @up="move(s.blocks, bi, -1)"
          @down="move(s.blocks, bi, 1)"
          @duplicate="duplicate(s.blocks, bi)"
          @remove="s.blocks.splice(bi, 1)"
        >
          <!-- Sous-titre -->
          <EdField v-if="b.type === 'heading'" label="Sous-titre"><input v-model="b.text" class="ed-input" /></EdField>

          <!-- Texte -->
          <template v-else-if="b.type === 'callout'">
            <div class="grid sm:grid-cols-2 gap-3">
              <EdField label="Couleur">
                <select v-model="b.tone" class="ed-input"><option value="indigo">Indigo</option><option value="amber">Ambre</option></select>
              </EdField>
              <EdField label="Taille du texte">
                <select v-model="b.size" class="ed-input"><option value="lg">Grand</option><option value="sm">Petit</option></select>
              </EdField>
            </div>
            <EdField label="Titre de l'encadré" hint="Facultatif"><input v-model="b.title" class="ed-input" /></EdField>
            <EdField label="Paragraphes" hint="Une ligne vide = nouveau paragraphe · **gras** possible"><ListInput v-model="b.paragraphs" mode="para" :rows="4" /></EdField>
            <EdField label="Liste à puces" hint="Une par ligne, facultatif"><ListInput v-model="b.items" :rows="3" /></EdField>
            <EdField label="Puces">
              <select v-model="b.bullet" class="ed-input sm:!w-auto"><option value="arrow">▸</option><option value="dot">•</option><option value="square">▫️</option></select>
            </EdField>
          </template>

          <!-- Cartes -->
          <template v-else-if="b.type === 'cards'">
            <div class="grid sm:grid-cols-2 gap-3">
              <EdField label="Colonnes">
                <select v-model.number="b.columns" class="ed-input"><option :value="1">1</option><option :value="2">2</option><option :value="3">3</option></select>
              </EdField>
              <EdField label="Style des cartes">
                <select v-model="b.style" class="ed-input"><option value="plain">Simples</option><option value="gradient">Dégradées</option></select>
              </EdField>
            </div>
            <EdItem
              v-for="(c, ci) in b.cards"
              :key="ci"
              nested
              :icon="c.icon"
              :title="c.title"
              empty-title="Carte sans titre"
              :open="!c.title"
              :first="ci === 0"
              :last="ci === b.cards.length - 1"
              confirm="Supprimer cette carte ?"
              @up="move(b.cards, ci, -1)"
              @down="move(b.cards, ci, 1)"
              @duplicate="duplicate(b.cards, ci)"
              @remove="b.cards.splice(ci, 1)"
            >
              <CardEditor :card="c" />
            </EdItem>
            <EdAdd @click="b.cards.push(newCard())">Carte</EdAdd>
          </template>

          <!-- Images -->
          <template v-else-if="b.type === 'image'">
            <EdItem
              v-for="(img, ii) in b.images"
              :key="ii"
              nested
              :title="img.caption || 'Image ' + (ii + 1)"
              :first="ii === 0"
              :last="ii === b.images.length - 1"
              confirm="Retirer cette image ?"
              no-duplicate
              open
              @up="move(b.images, ii, -1)"
              @down="move(b.images, ii, 1)"
              @remove="b.images.splice(ii, 1)"
            >
              <div class="flex items-start gap-4">
                <img :src="imgSrc(img)" alt="" class="h-20 w-28 object-cover rounded-lg bg-slate-700 shrink-0" />
                <div class="flex-1 space-y-3">
                  <EdField label="Légende" hint="Facultatif"><input v-model="img.caption" class="ed-input" /></EdField>
                  <div class="grid sm:grid-cols-2 gap-3">
                    <EdField label="Affichage">
                      <select v-model="img.fit" class="ed-input"><option value="">Pleine largeur</option><option value="contain">Logo (contenu)</option></select>
                    </EdField>
                    <MaxHeightInput v-model="img.maxHeight" />
                  </div>
                </div>
              </div>
            </EdItem>
            <EdField label="Ajouter des images">
              <input type="file" accept="image/*" multiple @change="uploadInto($event, b.images, (url) => ({ url, caption: '' }))" />
            </EdField>
          </template>

          <!-- Carrousel -->
          <template v-else-if="b.type === 'carousel'">
            <div class="grid sm:grid-cols-3 gap-3">
              <EdField label="Éléments visibles">
                <select v-model.number="b.perView" class="ed-input"><option :value="1">1 à la fois</option><option :value="2">2 (ordinateur)</option><option :value="3">3 (ordinateur)</option></select>
              </EdField>
              <EdField label="Défilement">
                <select v-model.number="b.autoplay" class="ed-input"><option :value="0">Manuel</option><option :value="3">Auto : 3 s</option><option :value="5">Auto : 5 s</option><option :value="8">Auto : 8 s</option></select>
              </EdField>
              <EdField label="Style des cartes">
                <select v-model="b.cardStyle" class="ed-input"><option value="plain">Simples</option><option value="gradient">Dégradées</option></select>
              </EdField>
            </div>

            <EdItem
              v-for="(sl, li) in b.slides"
              :key="li"
              nested
              :title="(SLIDE_LABEL[sl.type] || 'Diapositive') + ' ' + (li + 1)"
              :subtitle="sl.caption || sl.title"
              :open="sl.type !== 'image' && !sl.title"
              :first="li === 0"
              :last="li === b.slides.length - 1"
              confirm="Supprimer cette diapositive ?"
              @up="move(b.slides, li, -1)"
              @down="move(b.slides, li, 1)"
              @duplicate="duplicate(b.slides, li)"
              @remove="b.slides.splice(li, 1)"
            >
              <div v-if="sl.type === 'image'" class="flex items-start gap-4">
                <img :src="imgSrc(sl)" alt="" class="h-20 w-28 object-cover rounded-lg bg-slate-700 shrink-0" />
                <div class="flex-1 space-y-3">
                  <EdField label="Légende" hint="Facultatif"><input v-model="sl.caption" class="ed-input" /></EdField>
                  <div class="grid sm:grid-cols-2 gap-3">
                    <EdField label="Affichage">
                      <select v-model="sl.fit" class="ed-input"><option value="">Pleine largeur</option><option value="contain">Logo (contenu)</option></select>
                    </EdField>
                    <MaxHeightInput v-model="sl.maxHeight" />
                  </div>
                </div>
              </div>

              <CardEditor v-else-if="sl.type === 'card'" :card="sl" />

              <template v-else>
                <div class="grid sm:grid-cols-2 gap-3">
                  <EdField label="Couleur">
                    <select v-model="sl.tone" class="ed-input"><option value="indigo">Indigo</option><option value="amber">Ambre</option></select>
                  </EdField>
                  <EdField label="Titre" hint="Facultatif"><input v-model="sl.title" class="ed-input" /></EdField>
                </div>
                <EdField label="Paragraphes" hint="Une ligne vide = nouveau paragraphe"><ListInput v-model="sl.paragraphs" mode="para" :rows="3" /></EdField>
                <EdField label="Liste à puces" hint="Facultatif"><ListInput v-model="sl.items" :rows="3" /></EdField>
              </template>
            </EdItem>

            <div class="flex flex-wrap gap-2">
              <EdAdd @click="b.slides.push(newSlide('card'))">Carte</EdAdd>
              <EdAdd @click="b.slides.push(newSlide('text'))">Texte</EdAdd>
            </div>
            <EdField label="Ajouter des images" hint="Une diapositive par image">
              <input type="file" accept="image/*" multiple @change="uploadInto($event, b.slides, (url) => ({ type: 'image', url, caption: '' }))" />
            </EdField>
          </template>

          <!-- Bouton -->
          <div v-else-if="b.type === 'button'" class="grid grid-cols-[5rem_1fr] sm:grid-cols-[5rem_1fr_1fr] gap-3">
            <EdField label="Icône"><input v-model="b.icon" class="ed-input" placeholder="📂" /></EdField>
            <EdField label="Texte du bouton"><input v-model="b.label" class="ed-input" /></EdField>
            <EdField label="Lien" class="col-span-2 sm:col-span-1"><input v-model="b.url" class="ed-input" placeholder="https://…" /></EdField>
          </div>
        </EdItem>

        <div class="flex flex-wrap items-center gap-2">
          <span class="text-sm text-slate-400">Ajouter un bloc :</span>
          <EdAdd v-for="[type, name] in BLOCK_TYPES" :key="type" @click="s.blocks.push(newBlock(type))">{{ name }}</EdAdd>
        </div>
      </EdItem>
    </EdPanel>

    <!-- Aperçu -->
    <button type="button" class="ed-btn ed-btn-ok" @click="preview = true">👁 Aperçu de la page</button>
    <div v-if="preview" class="fixed inset-0 z-[100] overflow-auto bg-slate-900">
      <button type="button" class="ed-btn ed-btn-danger fixed top-4 right-4 z-[110]" @click="preview = false">✕ Fermer l'aperçu</button>
      <PageRenderer :project="previewProject" :show-back="false" />
    </div>
  </div>
</template>
