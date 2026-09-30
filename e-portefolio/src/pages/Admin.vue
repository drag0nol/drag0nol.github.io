<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { supabase, supabaseEnabled } from '@/lib/supabase'
import {
  remoteRows, editableProjects, loadRemote,
  profile, profileRow, competences, competencesRow, experiences, experiencesRow,
  atouts, atoutsRow, loisirs, loisirsRow,
} from '@/content/remote'
import { rawProjects, upgradeLegacy } from '@/content'
import ProjectEditor from '@/components/ProjectEditor.vue'
import ProfileEditor from '@/components/ProfileEditor.vue'
import CompetencesEditor from '@/components/CompetencesEditor.vue'
import ExperiencesEditor from '@/components/ExperiencesEditor.vue'
import AtoutsEditor from '@/components/AtoutsEditor.vue'
import LoisirsEditor from '@/components/LoisirsEditor.vue'
import EdField from '@/components/admin/EdField.vue'
import EdPanel from '@/components/admin/EdPanel.vue'
import EdActions from '@/components/admin/EdActions.vue'
import EdNotice from '@/components/admin/EdNotice.vue'
import { clone } from '@/components/admin/ed.js'

// ---------- Session ----------
const session = ref(null)
const ready = ref(false)
const login = ref({ email: '', password: '' })
const busy = ref(false)

// ---------- Messages ----------
const message = ref('')
const error = ref('')
let messageTimer = null
watch(message, (m) => {
  clearTimeout(messageTimer)
  if (m) messageTimer = setTimeout(() => (message.value = ''), 6000)
})
const clearNotices = () => (message.value = error.value = '')

onMounted(async () => {
  window.addEventListener('beforeunload', onBeforeUnload)
  window.addEventListener('keydown', onKeydown)
  if (!supabaseEnabled) {
    ready.value = true
    return
  }
  const { data } = await supabase.auth.getSession()
  session.value = data.session
  supabase.auth.onAuthStateChange((_e, s) => (session.value = s))
  ready.value = true
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', onBeforeUnload)
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(messageTimer)
})

async function signIn() {
  error.value = ''
  busy.value = true
  const { error: e } = await supabase.auth.signInWithPassword(login.value)
  busy.value = false
  if (e) error.value = e.message
  else login.value.password = ''
}
const signOut = () => confirmLeave() && supabase.auth.signOut()

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// ---------- Onglets ----------
const TABS = [
  { key: 'project', label: 'Projets', list: true, url: '/projects' },
  { key: 'formation', label: 'Formations', list: true, url: '/formation' },
  { key: 'profile', label: 'Profil & contact', url: '/' },
  { key: 'competences', label: 'Compétences', url: '/competences' },
  { key: 'experiences', label: 'Expériences', url: '/experiences' },
  { key: 'atouts', label: 'Atouts', url: '/mes-atouts' },
  { key: 'loisirs', label: 'Loisirs', url: '/loisirs' },
]
const tab = ref('project')
const currentTab = computed(() => TABS.find((t) => t.key === tab.value))

// ---------- Pages à contenu unique (une ligne « main » par type) ----------
const DB_HINT = "La base n'accepte pas encore ce contenu : exécute supabase/migration-competences.sql dans Supabase (SQL Editor)."

function makePage(kind, current, row, { savedMessage, clean = (d) => d, prepare = (d) => d }) {
  const form = ref(null)
  const snapshot = ref('')
  const load = () => {
    form.value = prepare(clone(current.value))
    snapshot.value = JSON.stringify(form.value)
  }
  const dirty = computed(() => form.value !== null && JSON.stringify(form.value) !== snapshot.value)

  async function save() {
    busy.value = true
    clearNotices()
    const data = clean(clone(form.value))
    const q = supabase.from('content')
    const { error: e } = row.value
      ? await q.update({ data }).eq('id', row.value.id)
      : await q.insert({ kind, slug: 'main', data })
    busy.value = false
    if (e) {
      error.value = /content_kind_check|check constraint/i.test(e.message) ? DB_HINT : e.message
      return
    }
    await loadRemote()
    load()
    message.value = savedMessage
  }
  async function reset() {
    if (!row.value || !confirm("Rétablir la version d'origine ? Tes modifications seront perdues.")) return
    const { error: e } = await supabase.from('content').delete().eq('id', row.value.id)
    if (e) {
      error.value = e.message
      return
    }
    await loadRemote()
    load()
    message.value = "Version d'origine rétablie."
  }
  return { form, load, dirty, save, reset, row }
}

const PAGES = {
  profile: makePage('profile', profile, profileRow, { savedMessage: 'Profil enregistré. Visible tout de suite sur la page d’accueil.' }),
  competences: makePage('competences', competences, competencesRow, { savedMessage: 'Compétences enregistrées. Visibles tout de suite sur le site.' }),
  experiences: makePage('experiences', experiences, experiencesRow, {
    savedMessage: 'Expériences enregistrées. Visibles tout de suite sur le site.',
    prepare: (d) => {
      for (const it of d.items) {
        it.periodLabel = it.periodLabel || ''
        it.tags = it.tags || []
        it.timeline = it.timeline || []
      }
      return d
    },
    clean: (d) => {
      d.items = d.items.filter((it) => it.title || it.company)
      for (const it of d.items) it.timeline = it.timeline.filter((t) => t.period && t.period.trim())
      return d
    },
  }),
  atouts: makePage('atouts', atouts, atoutsRow, {
    savedMessage: 'Atouts enregistrés. Visibles tout de suite sur le site.',
    clean: (d) => {
      d.categories = d.categories.filter((c) => c.label || c.items.length)
      for (const c of d.categories) {
        c.items = c.items.filter((it) => it.title)
        for (const it of c.items) {
          if (it.level === '' || it.level === null || it.level === undefined) delete it.level
          else it.level = Number(it.level)
        }
      }
      return d
    },
  }),
  loisirs: makePage('loisirs', loisirs, loisirsRow, {
    savedMessage: 'Loisirs enregistrés. Visibles tout de suite sur le site.',
    clean: (d) => {
      d.items = d.items.filter((it) => it.title || it.label)
      d.impacts = d.impacts.filter((im) => im.title || im.text)
      return d
    },
  }),
}
const EDITORS = {
  profile: ProfileEditor,
  competences: CompetencesEditor,
  experiences: ExperiencesEditor,
  atouts: AtoutsEditor,
  loisirs: LoisirsEditor,
}
const page = computed(() => PAGES[tab.value])

// Les données distantes peuvent arriver après l'ouverture d'un onglet : on rafraîchit le formulaire tant qu'il est intact.
watch(remoteRows, () => {
  const p = page.value
  if (p && p.form.value && !p.dirty.value) p.load()
})

// ---------- Projets et formations (liste + édition d'un élément) ----------
const editing = ref(null) // { id, slug, kind, baseSlug, form }
const editSnapshot = ref('')
const startEditing = (e) => {
  editing.value = e
  editSnapshot.value = JSON.stringify(e.form)
  clearNotices()
}
const editingDirty = computed(() => editing.value !== null && JSON.stringify(editing.value.form) !== editSnapshot.value)

function projectShape(data) {
  const d = upgradeLegacy(clone(data))
  const blockDefaults = {
    callout: { tone: 'indigo', size: 'lg', bullet: 'arrow', title: '', paragraphs: [], items: [] },
    cards: { columns: 2, style: 'plain' },
    carousel: { perView: 1, autoplay: 0, cardStyle: 'plain' },
  }
  const cardDefaults = { iconPosition: 'left', iconSize: '3xl', bullet: 'dot', size: 'base', items: [] }
  const fixCard = (c) => Object.assign(c, { ...cardDefaults, ...c })
  const sections = d.sections.map((s) => ({
    title: s.title || '',
    blocks: s.blocks.map((b) => {
      const nb = { ...(blockDefaults[b.type] || {}), ...b }
      if (nb.type === 'cards') nb.cards = nb.cards.map((c) => fixCard({ ...c }))
      if (nb.type === 'carousel') nb.slides = (nb.slides || []).map((sl) => (sl.type === 'card' ? fixCard({ ...sl }) : sl.type === 'text' ? { tone: 'indigo', bullet: 'arrow', ...sl } : sl))
      if (nb.type === 'image') nb.images = nb.images.map((i) => ({ fit: '', ...i }))
      return nb
    }),
  }))
  return {
    publie: true,
    tone: 'indigo',
    order: 0,
    category: '',
    summary: '',
    status: '',
    cover: '',
    ...d,
    tags: d.tags || [],
    header: { kicker: '', subtitle: '', factsStyle: 'plain', ...d.header, facts: d.header.facts || [] },
    sections,
  }
}
const emptyProject = () =>
  projectShape({
    title: '',
    header: { title: '' },
    sections: [{ title: '', blocks: [{ type: 'callout', size: 'lg', tone: 'indigo', paragraphs: [], items: [] }] }],
  })

// Les images du dépôt (champ `file`) sont référencées par "projet/fichier" quand on copie un projet.
function qualifyImages(data, slug) {
  const q = (f) => (f && !f.includes('/') && !/^(https?:)?\/\//.test(f) ? `${slug}/${f}` : f)
  if (data.cover) data.cover = q(data.cover)
  for (const s of data.sections)
    for (const b of s.blocks) {
      const imgs = b.type === 'image' ? b.images : b.type === 'carousel' ? b.slides.filter((x) => x.type === 'image') : []
      for (const i of imgs) if (!i.url && i.file) i.file = q(i.file)
    }
  return data
}

const newProject = () => startEditing({ id: null, slug: null, kind: 'project', baseSlug: '', form: emptyProject() })
const editProject = (p) =>
  startEditing({ id: p.row?.id ?? null, slug: p.slug, kind: 'project', baseSlug: rawProjects[p.slug] ? p.slug : '', form: projectShape(p.data) })
function duplicateProject(p) {
  const form = projectShape(p.data)
  form.title = `${form.title} (copie)`
  form.header.title = `${form.header.title} (copie)`
  qualifyImages(form, p.slug)
  startEditing({ id: null, slug: null, kind: 'project', baseSlug: '', form })
}

const emptyFormation = () => ({ icon: '🎓', title: '', subtitle: '', period: '', text: '', tags: '' })
const formationForm = (d) => ({
  ...emptyFormation(),
  ...d,
  tags: (d.tags || []).map((t) => (t.url ? `${t.label} | ${t.url}` : t.label)).join('\n'),
})
const formationData = (f) => ({
  icon: f.icon,
  title: f.title,
  subtitle: f.subtitle,
  period: f.period,
  text: f.text,
  tags: f.tags.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const [label, url] = l.split('|').map((x) => x.trim())
    return url ? { label, url } : { label }
  }),
})
const formationRows = computed(() => remoteRows.value.filter((r) => r.kind === 'formation'))
const newFormation = () => startEditing({ id: null, slug: null, kind: 'formation', form: emptyFormation() })
const editFormation = (r) => startEditing({ id: r.id, slug: r.slug, kind: 'formation', form: formationForm(r.data) })

async function saveEditing() {
  const { id, kind, form } = editing.value
  const title = kind === 'project' ? form.title || form.header.title : form.title
  if (!title || !title.trim()) {
    error.value = 'Le titre est obligatoire.'
    return
  }
  let data
  if (kind === 'project') {
    data = clone(form)
    data.title = title
    data.header.title = data.header.title || title
    data.order = Number(data.order) || 0
  } else data = formationData(form)

  const slug = editing.value.slug || slugify(title) || String(Date.now())
  if (!editing.value.slug && kind === 'project' && (rawProjects[slug] || editableProjects.value.some((p) => p.slug === slug))) {
    error.value = 'Un projet avec ce titre existe déjà. Change le titre.'
    return
  }

  busy.value = true
  clearNotices()
  const q = supabase.from('content')
  const { error: e } = id ? await q.update({ data }).eq('id', id) : await q.insert({ kind, slug, data })
  busy.value = false
  if (e) {
    error.value = e.code === '23505' ? 'Un élément avec ce titre existe déjà.' : e.message
    return
  }
  await loadRemote()
  editing.value = null
  message.value = 'Enregistré. Visible tout de suite sur le site.'
}

async function removeRow(row, label, verb = 'Supprimer') {
  if (!confirm(`${verb} « ${label} » ?`)) return
  const { error: e } = await supabase.from('content').delete().eq('id', row.id)
  if (e) error.value = e.message
  else {
    await loadRemote()
    message.value = verb === 'Supprimer' ? 'Supprimé.' : "Version d'origine rétablie."
  }
}

async function upload(file) {
  const ext = (file.name.split('.').pop() || 'png').toLowerCase()
  const name = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'}.${ext}`
  const { error: e } = await supabase.storage.from('images').upload(name, file, { contentType: file.type })
  if (e) throw e
  return supabase.storage.from('images').getPublicUrl(name).data.publicUrl
}

// ---------- Navigation, garde-fous et raccourcis ----------
const anyDirty = computed(() => (currentTab.value?.list ? editingDirty.value : !!page.value?.dirty.value))

function confirmLeave() {
  return !anyDirty.value || confirm('Tu as des modifications non enregistrées. Les abandonner ?')
}

function selectTab(key) {
  if (key === tab.value) return
  if (!confirmLeave()) return
  editing.value = null
  tab.value = key
  clearNotices()
  if (PAGES[key]) PAGES[key].load()
}
function cancelEditing() {
  if (confirmLeave()) editing.value = null
}

function onBeforeUnload(e) {
  if (anyDirty.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}
function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault()
    if (busy.value || !session.value) return
    if (currentTab.value?.list) editing.value && saveEditing()
    else page.value?.save()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 class="text-4xl font-bold text-white mb-8">Administration</h1>

      <p v-if="!ready" class="text-slate-400">Chargement…</p>

      <div v-else-if="!supabaseEnabled" class="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
        L'administration n'est pas configurée : les variables <code>VITE_SUPABASE_URL</code> et
        <code>VITE_SUPABASE_ANON_KEY</code> sont absentes. Voir le README.
      </div>

      <!-- Connexion -->
      <form v-else-if="!session" class="ed-panel max-w-md" @submit.prevent="signIn">
        <h2 class="text-2xl font-bold text-indigo-200">Connexion</h2>
        <EdField label="Email"><input v-model="login.email" type="email" required autocomplete="username" class="ed-input" /></EdField>
        <EdField label="Mot de passe"><input v-model="login.password" type="password" required autocomplete="current-password" class="ed-input" /></EdField>
        <EdNotice v-if="error" kind="error" @close="error = ''">{{ error }}</EdNotice>
        <button class="ed-btn ed-btn-primary" :disabled="busy">Se connecter</button>
      </form>

      <template v-else>
        <div class="flex items-center justify-between gap-3 mb-6 text-sm text-slate-400">
          <span class="truncate">Connecté : {{ session.user.email }}</span>
          <button class="ed-btn ed-btn-ghost ed-btn-sm" @click="signOut">Se déconnecter</button>
        </div>

        <!-- Onglets -->
        <nav class="flex flex-wrap gap-2 mb-6" aria-label="Sections du site">
          <button
            v-for="t in TABS"
            :key="t.key"
            class="ed-btn ed-btn-sm"
            :class="tab === t.key ? 'ed-btn-primary' : 'ed-btn-ghost'"
            :aria-current="tab === t.key ? 'page' : undefined"
            @click="selectTab(t.key)"
          >{{ t.label }}</button>
        </nav>

        <!-- Messages -->
        <div class="space-y-3 mb-4">
          <EdNotice v-if="error" kind="error" @close="error = ''">{{ error }}</EdNotice>
          <EdNotice v-if="message" @close="message = ''">{{ message }}</EdNotice>
        </div>

        <!-- ===== Projets et formations : liste ===== -->
        <template v-if="currentTab.list && !editing">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 class="text-2xl font-bold text-white">{{ currentTab.label }}</h2>
            <div class="flex items-center gap-2">
              <a :href="currentTab.url" target="_blank" rel="noopener" class="ed-btn ed-btn-ghost ed-btn-sm">Voir la page ↗</a>
              <button class="ed-btn ed-btn-primary ed-btn-sm" @click="tab === 'project' ? newProject() : newFormation()">+ Ajouter</button>
            </div>
          </div>

          <template v-if="tab === 'project'">
            <p class="ed-hint mb-4 !mt-0">
              Tous les projets sont modifiables, y compris ceux du dépôt : la version modifiée remplace l'original.
              « Dupliquer » crée une page similaire à partir d'un modèle.
            </p>
            <ul class="space-y-3">
              <li v-for="p in editableProjects" :key="p.slug" class="ed-card bg-slate-800/60 p-4 flex flex-wrap items-center gap-3">
                <div class="flex-1 min-w-[10rem]">
                  <span class="font-semibold text-white">{{ p.data.title }}</span>
                  <span class="ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{{ p.source }}</span>
                  <span v-if="p.data.publie === false" class="ml-1 text-xs text-amber-300">(masqué)</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <router-link :to="'/projects/' + p.slug" class="ed-btn ed-btn-ghost ed-btn-sm">Voir</router-link>
                  <button class="ed-btn ed-btn-ghost ed-btn-sm" @click="editProject(p)">Modifier</button>
                  <button class="ed-btn ed-btn-ghost ed-btn-sm" @click="duplicateProject(p)">Dupliquer</button>
                  <button v-if="p.row && p.source === 'modifié'" class="ed-btn ed-btn-danger ed-btn-sm" @click="removeRow(p.row, p.data.title, 'Rétablir l’original de')">Rétablir l'original</button>
                  <button v-else-if="p.row" class="ed-btn ed-btn-danger ed-btn-sm" @click="removeRow(p.row, p.data.title)">Supprimer</button>
                </div>
              </li>
            </ul>
          </template>

          <template v-else>
            <p v-if="!formationRows.length" class="ed-hint !mt-0">Aucune formation ajoutée ici. Celles des fichiers du dépôt n'apparaissent pas dans cette liste.</p>
            <ul class="space-y-3">
              <li v-for="r in formationRows" :key="r.id" class="ed-card bg-slate-800/60 p-4 flex flex-wrap items-center gap-3">
                <span class="flex-1 min-w-[10rem] font-semibold text-white">{{ r.data.title }}</span>
                <div class="flex flex-wrap gap-2">
                  <button class="ed-btn ed-btn-ghost ed-btn-sm" @click="editFormation(r)">Modifier</button>
                  <button class="ed-btn ed-btn-danger ed-btn-sm" @click="removeRow(r, r.data.title)">Supprimer</button>
                </div>
              </li>
            </ul>
          </template>
        </template>

        <!-- ===== Projets et formations : édition ===== -->
        <form v-else-if="currentTab.list && editing" class="space-y-6" @submit.prevent="saveEditing">
          <h2 class="text-2xl font-bold text-white">
            {{ editing.id || editing.slug ? 'Modifier' : 'Ajouter' }} {{ editing.kind === 'project' ? 'un projet' : 'une formation' }}
          </h2>

          <EdPanel v-if="editing.kind === 'formation'" title="Formation">
            <div class="grid grid-cols-[5rem_1fr] gap-3">
              <EdField label="Icône"><input v-model="editing.form.icon" class="ed-input" placeholder="🎓" /></EdField>
              <EdField label="Titre"><input v-model="editing.form.title" required class="ed-input" placeholder="BUT Informatique" /></EdField>
            </div>
            <EdField label="Établissement / lieu"><input v-model="editing.form.subtitle" class="ed-input" /></EdField>
            <EdField label="Période"><input v-model="editing.form.period" class="ed-input" placeholder="2023 — Présent" /></EdField>
            <EdField label="Description" hint="Facultatif"><textarea v-model="editing.form.text" rows="3" class="ed-input"></textarea></EdField>
            <EdField label="Étiquettes" hint="Une par ligne. Pour un lien : Texte | https://…">
              <textarea v-model="editing.form.tags" rows="4" class="ed-input"></textarea>
            </EdField>
          </EdPanel>

          <ProjectEditor v-else :form="editing.form" :base-slug="editing.baseSlug" :upload="upload" @error="(m) => (error = m)" />

          <EdActions :dirty="editingDirty" :busy="busy" show-cancel cancel-label="Retour à la liste" @save="saveEditing" @cancel="cancelEditing" />
        </form>

        <!-- ===== Pages à contenu unique ===== -->
        <form v-else-if="page && page.form.value" class="space-y-6" @submit.prevent="page.save()">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-2xl font-bold text-white">{{ currentTab.label }}</h2>
            <a :href="currentTab.url" target="_blank" rel="noopener" class="ed-btn ed-btn-ghost ed-btn-sm">Voir la page ↗</a>
          </div>

          <component
            :is="EDITORS[tab]"
            :form="page.form.value"
            v-bind="tab === 'profile' ? { upload } : {}"
            @error="(m) => (error = m)"
          />

          <EdActions :dirty="page.dirty.value" :busy="busy" :can-reset="!!page.row.value" @save="page.save()" @reset="page.reset()" />
        </form>
      </template>
    </div>
  </div>
</template>
