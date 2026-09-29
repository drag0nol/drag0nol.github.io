<script setup>
// Éditeur de page projet : édite en place l'objet `form` (même format que project.json).
import { ref, computed } from 'vue'
import ListInput from './ListInput.vue'
import PageRenderer from './PageRenderer.vue'
import CardEditor from './CardEditor.vue'
import { normalizeProject, resolverFor } from '@/content'

const props = defineProps({
  form: { type: Object, required: true },
  baseSlug: { type: String, default: '' }, // dossier des images du dépôt, si projet du dépôt
  upload: { type: Function, required: true }, // (File) => Promise<url>
})
const emit = defineEmits(['error'])

const input = 'w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400'
const small = 'px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm text-white'
const danger = 'px-2 py-1 rounded bg-red-600/80 hover:bg-red-600 text-sm text-white'
const btn = 'px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold'
const box = 'bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4 space-y-3'
const label = 'block text-sm text-slate-400'

const resolve = computed(() => resolverFor(props.baseSlug))
const imgSrc = (img) =>
  img.url || (img.file && (/^(https?:)?\/\//.test(img.file) ? img.file : resolve.value(img.file)))

const BLOCK_TYPES = [
  ['callout', 'Texte'],
  ['heading', 'Sous-titre'],
  ['cards', 'Cartes'],
  ['image', 'Image'],
  ['carousel', 'Carrousel'],
  ['button', 'Bouton'],
]
const BLOCK_LABEL = Object.fromEntries(BLOCK_TYPES)

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

function move(list, i, d) {
  const j = i + d
  if (j < 0 || j >= list.length) return
  ;[list[i], list[j]] = [list[j], list[i]]
}
const clone = (o) => JSON.parse(JSON.stringify(o))
const duplicate = (list, i) => list.splice(i + 1, 0, clone(list[i]))

async function uploadImages(ev, images) {
  try {
    for (const file of ev.target.files) images.push({ url: await props.upload(file), caption: '' })
  } catch (e) {
    emit('error', "Envoi de l'image impossible : " + e.message)
  }
  ev.target.value = ''
}
async function uploadSlides(ev, slides) {
  try {
    for (const file of ev.target.files) slides.push({ type: 'image', url: await props.upload(file), caption: '' })
  } catch (e) {
    emit('error', "Envoi de l'image impossible : " + e.message)
  }
  ev.target.value = ''
}
const SLIDE_LABEL = { image: 'Image', card: 'Carte', text: 'Texte' }
const newSlide = (type) =>
  type === 'card'
    ? { type, ...newCard() }
    : { type, tone: 'indigo', title: '', paragraphs: [], items: [], bullet: 'arrow' }

async function uploadCover(ev) {
  try {
    props.form.cover = await props.upload(ev.target.files[0])
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
  <div class="space-y-8">
    <!-- Carte -->
    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">1. Carte sur la page « Projets »</legend>
      <input v-model="form.title" placeholder="Titre de la carte" required :class="input" />
      <div class="grid md:grid-cols-2 gap-3">
        <input v-model="form.category" placeholder="Catégorie (ex. SAE — Jeu)" :class="input" />
        <input v-model="form.status" placeholder="Badge (ex. EN COURS)" :class="input" />
      </div>
      <textarea v-model="form.summary" rows="2" placeholder="Résumé de la carte" :class="input"></textarea>
      <label :class="label">Technologies (séparées par des virgules)
        <ListInput v-model="form.tags" mode="comma" :rows="1" />
      </label>
      <div class="flex flex-wrap items-center gap-4 text-sm text-slate-400">
        <label>Couleur
          <select v-model="form.tone" :class="input + ' w-auto ml-2'">
            <option value="indigo">Indigo</option>
            <option value="amber">Ambre (en cours)</option>
          </select>
        </label>
        <label>Ordre <input type="number" v-model.number="form.order" :class="input + ' w-20 inline-block'" /></label>
        <label class="flex items-center gap-2"><input type="checkbox" v-model="form.publie" /> Publié</label>
      </div>
    </fieldset>

    <!-- En-tête -->
    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">2. En-tête de la page</legend>
      <input v-model="h.kicker" placeholder="Petit texte au-dessus (ex. Projet étudiant — SAE)" :class="input" />
      <input v-model="h.title" placeholder="Titre de la page" :class="input" />
      <label class="flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" v-model="h.smallTitle" /> Titre plus petit (titre long)</label>
      <input v-model="h.subtitle" placeholder="Sous-titre" :class="input" />

      <div class="flex gap-3">
        <button type="button" :class="btn" @click="toggleNotice">{{ h.notice ? '− Retirer' : '+ Ajouter' }} un bandeau d'avertissement</button>
        <button type="button" :class="btn" @click="toggleCriteria">{{ h.criteria ? '− Retirer' : '+ Ajouter' }} les apprentissages critiques</button>
      </div>

      <div v-if="h.notice" :class="box">
        <div class="grid grid-cols-[70px_1fr] gap-3">
          <input v-model="h.notice.icon" placeholder="⚠️" :class="input" />
          <input v-model="h.notice.title" placeholder="Titre du bandeau" :class="input" />
        </div>
        <textarea v-model="h.notice.text" rows="2" placeholder="Texte du bandeau" :class="input"></textarea>
      </div>

      <div v-if="h.criteria" :class="box">
        <input v-model="h.criteria.title" placeholder="Titre de l'encadré" :class="input" />
        <div v-for="(it, i) in h.criteria.items" :key="i" class="grid grid-cols-[110px_1fr_auto] gap-2">
          <input v-model="it.code" placeholder="AC11.01" :class="input" />
          <input v-model="it.text" placeholder="Intitulé" :class="input" />
          <button type="button" :class="danger" @click="h.criteria.items.splice(i, 1)">✕</button>
        </div>
        <button type="button" :class="small" @click="h.criteria.items.push({ code: '', text: '' })">+ Ligne</button>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-3 text-sm text-slate-400">
          <span>Badges d'infos</span>
          <select v-model="h.factsStyle" :class="input + ' w-auto'">
            <option value="plain">Simples (icône + texte)</option>
            <option value="chips">Étiquettes encadrées</option>
          </select>
        </div>
        <div v-for="(f, i) in h.facts" :key="i" class="grid grid-cols-[70px_1fr_auto] gap-2">
          <input v-model="f.icon" placeholder="👥" :class="input" />
          <input v-model="f.text" placeholder="**Équipe de 3** personnes" :class="input" />
          <button type="button" :class="danger" @click="h.facts.splice(i, 1)">✕</button>
        </div>
        <button type="button" :class="small" @click="h.facts.push({ icon: '', text: '' })">+ Badge</button>
      </div>
    </fieldset>

    <!-- Sections -->
    <div v-for="(s, si) in form.sections" :key="si" :class="box + ' !border-indigo-500/40'">
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold text-indigo-200 whitespace-nowrap">Section {{ si + 1 }}</span>
        <input v-model="s.title" placeholder="Titre de la section (ex. Partie 1 : Concept)" :class="input" />
        <button type="button" :class="small" @click="move(form.sections, si, -1)">↑</button>
        <button type="button" :class="small" @click="move(form.sections, si, 1)">↓</button>
        <button type="button" :class="danger" @click="form.sections.splice(si, 1)">✕</button>
      </div>

      <div v-for="(b, bi) in s.blocks" :key="bi" :class="box + ' bg-slate-900/50'">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-indigo-300 flex-1">{{ BLOCK_LABEL[b.type] }}</span>
          <button type="button" :class="small" @click="move(s.blocks, bi, -1)">↑</button>
          <button type="button" :class="small" @click="move(s.blocks, bi, 1)">↓</button>
          <button type="button" :class="small" @click="duplicate(s.blocks, bi)">Dupliquer</button>
          <button type="button" :class="danger" @click="s.blocks.splice(bi, 1)">✕</button>
        </div>

        <!-- Sous-titre -->
        <input v-if="b.type === 'heading'" v-model="b.text" placeholder="Sous-titre" :class="input" />

        <!-- Texte -->
        <template v-else-if="b.type === 'callout'">
          <div class="flex flex-wrap gap-3 text-sm text-slate-400">
            <select v-model="b.tone" :class="input + ' w-auto'">
              <option value="indigo">Indigo</option>
              <option value="amber">Ambre</option>
            </select>
            <select v-model="b.size" :class="input + ' w-auto'">
              <option value="lg">Grand texte</option>
              <option value="sm">Petit texte</option>
            </select>
          </div>
          <input v-model="b.title" placeholder="Titre de l'encadré (facultatif)" :class="input" />
          <label :class="label">Paragraphes (ligne vide = nouveau paragraphe, **gras**)
            <ListInput v-model="b.paragraphs" mode="para" :rows="4" />
          </label>
          <label :class="label">Liste à puces (une par ligne, facultatif)
            <ListInput v-model="b.items" :rows="3" />
          </label>
          <select v-model="b.bullet" :class="input + ' w-auto'">
            <option value="arrow">Puce ▸</option>
            <option value="dot">Puce •</option>
            <option value="square">Puce ▫️</option>
          </select>
        </template>

        <!-- Cartes -->
        <template v-else-if="b.type === 'cards'">
          <div class="flex flex-wrap gap-3 text-sm text-slate-400">
            <select v-model.number="b.columns" :class="input + ' w-auto'">
              <option :value="1">1 colonne</option>
              <option :value="2">2 colonnes</option>
              <option :value="3">3 colonnes</option>
            </select>
            <select v-model="b.style" :class="input + ' w-auto'">
              <option value="plain">Cartes simples</option>
              <option value="gradient">Cartes dégradées</option>
            </select>
          </div>

          <div v-for="(c, ci) in b.cards" :key="ci" :class="box">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-slate-300 flex-1">Carte {{ ci + 1 }}</span>
              <button type="button" :class="small" @click="move(b.cards, ci, -1)">←</button>
              <button type="button" :class="small" @click="move(b.cards, ci, 1)">→</button>
              <button type="button" :class="small" @click="duplicate(b.cards, ci)">Dupliquer</button>
              <button type="button" :class="danger" @click="b.cards.splice(ci, 1)">✕</button>
            </div>
            <CardEditor :card="c" />
          </div>
          <button type="button" :class="small" @click="b.cards.push(newCard())">+ Carte</button>
        </template>

        <!-- Images -->
        <template v-else-if="b.type === 'image'">
          <div v-for="(img, ii) in b.images" :key="ii" class="flex items-center gap-3">
            <img :src="imgSrc(img)" class="h-14 w-20 object-cover rounded bg-slate-700" />
            <input v-model="img.caption" placeholder="Légende" :class="input" />
            <select v-model="img.fit" :class="input + ' w-auto'">
              <option value="">Pleine largeur</option>
              <option value="contain">Logo (contenu)</option>
            </select>
            <button type="button" :class="danger" @click="b.images.splice(ii, 1)">✕</button>
          </div>
          <label :class="label">Ajouter des images
            <input type="file" accept="image/*" multiple class="block mt-1" @change="uploadImages($event, b.images)" />
          </label>
        </template>

        <!-- Carrousel -->
        <template v-else-if="b.type === 'carousel'">
          <div class="flex flex-wrap gap-3 text-sm text-slate-400">
            <select v-model.number="b.perView" :class="input + ' w-auto'">
              <option :value="1">1 élément à la fois</option>
              <option :value="2">2 à la fois (ordinateur)</option>
              <option :value="3">3 à la fois (ordinateur)</option>
            </select>
            <select v-model.number="b.autoplay" :class="input + ' w-auto'">
              <option :value="0">Défilement manuel</option>
              <option :value="3">Auto : 3 s</option>
              <option :value="5">Auto : 5 s</option>
              <option :value="8">Auto : 8 s</option>
            </select>
            <select v-model="b.cardStyle" :class="input + ' w-auto'">
              <option value="plain">Cartes simples</option>
              <option value="gradient">Cartes dégradées</option>
            </select>
          </div>

          <div v-for="(sl, li) in b.slides" :key="li" :class="box">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-slate-300 flex-1">Diapositive {{ li + 1 }} — {{ SLIDE_LABEL[sl.type] }}</span>
              <button type="button" :class="small" @click="move(b.slides, li, -1)">←</button>
              <button type="button" :class="small" @click="move(b.slides, li, 1)">→</button>
              <button type="button" :class="small" @click="duplicate(b.slides, li)">Dupliquer</button>
              <button type="button" :class="danger" @click="b.slides.splice(li, 1)">✕</button>
            </div>

            <div v-if="sl.type === 'image'" class="flex items-center gap-3">
              <img :src="imgSrc(sl)" class="h-14 w-20 object-cover rounded bg-slate-700" />
              <input v-model="sl.caption" placeholder="Légende" :class="input" />
              <select v-model="sl.fit" :class="input + ' w-auto'">
                <option value="">Pleine largeur</option>
                <option value="contain">Logo (contenu)</option>
              </select>
            </div>

            <CardEditor v-else-if="sl.type === 'card'" :card="sl" />

            <template v-else>
              <select v-model="sl.tone" :class="input + ' w-auto'">
                <option value="indigo">Indigo</option>
                <option value="amber">Ambre</option>
              </select>
              <input v-model="sl.title" placeholder="Titre (facultatif)" :class="input" />
              <label :class="label">Paragraphes (ligne vide = nouveau paragraphe)
                <ListInput v-model="sl.paragraphs" mode="para" :rows="3" />
              </label>
              <label :class="label">Liste à puces (facultatif)
                <ListInput v-model="sl.items" :rows="3" />
              </label>
            </template>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button type="button" :class="small" @click="b.slides.push(newSlide('card'))">+ Carte</button>
            <button type="button" :class="small" @click="b.slides.push(newSlide('text'))">+ Texte</button>
          </div>
          <label :class="label">Ajouter des images (une diapositive par image)
            <input type="file" accept="image/*" multiple class="block mt-1" @change="uploadSlides($event, b.slides)" />
          </label>
        </template>

        <!-- Bouton -->
        <div v-else-if="b.type === 'button'" class="grid grid-cols-[70px_1fr_1fr] gap-2">
          <input v-model="b.icon" placeholder="📂" :class="input" />
          <input v-model="b.label" placeholder="Texte du bouton" :class="input" />
          <input v-model="b.url" placeholder="https://..." :class="input" />
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm text-slate-400">Ajouter :</span>
        <button v-for="[type, name] in BLOCK_TYPES" :key="type" type="button" :class="btn" @click="s.blocks.push(newBlock(type))">+ {{ name }}</button>
      </div>
    </div>

    <button type="button" :class="btn" @click="form.sections.push({ title: '', blocks: [] })">+ Nouvelle section</button>

    <!-- Aperçu -->
    <button type="button" :class="btn + ' !bg-emerald-700 hover:!bg-emerald-600'" @click="preview = true">👁 Aperçu de la page</button>
    <div v-if="preview" class="fixed inset-0 z-[100] overflow-auto bg-slate-900">
      <button type="button" :class="btn + ' fixed top-4 right-4 z-[110] !bg-red-600'" @click="preview = false">✕ Fermer l'aperçu</button>
      <PageRenderer :project="previewProject" />
    </div>
  </div>
</template>
