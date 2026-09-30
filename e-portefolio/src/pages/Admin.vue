<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase, supabaseEnabled } from '@/lib/supabase'
import { remoteRows, editableProjects, loadRemote, profile, profileRow, competences, competencesRow, experiences, experiencesRow, atouts, atoutsRow, loisirs, loisirsRow } from '@/content/remote'
import { rawProjects, upgradeLegacy } from '@/content'
import ProjectEditor from '@/components/ProjectEditor.vue'
import ProfileEditor from '@/components/ProfileEditor.vue'
import CompetencesEditor from '@/components/CompetencesEditor.vue'
import ExperiencesEditor from '@/components/ExperiencesEditor.vue'
import AtoutsEditor from '@/components/AtoutsEditor.vue'
import LoisirsEditor from '@/components/LoisirsEditor.vue'

const input = 'w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400'
const btn = 'px-4 py-2 rounded-lg font-semibold text-white transition-colors'
const btnMain = btn + ' bg-indigo-600 hover:bg-indigo-700'
const btnGhost = btn + ' bg-slate-700 hover:bg-slate-600'
const btnDanger = btn + ' bg-red-600/80 hover:bg-red-600'

const session = ref(null)
const ready = ref(false)
const login = ref({ email: '', password: '' })
const message = ref('')
const error = ref('')
const busy = ref(false)

const tab = ref('project')
const editing = ref(null) // { id, slug, kind, baseSlug, form }

onMounted(async () => {
  if (!supabaseEnabled) {
    ready.value = true
    return
  }
  const { data } = await supabase.auth.getSession()
  session.value = data.session
  supabase.auth.onAuthStateChange((_e, s) => (session.value = s))
  ready.value = true
})

async function signIn() {
  error.value = ''
  busy.value = true
  const { error: e } = await supabase.auth.signInWithPassword(login.value)
  busy.value = false
  if (e) error.value = e.message
  else login.value.password = ''
}
const signOut = () => supabase.auth.signOut()

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const clone = (o) => JSON.parse(JSON.stringify(o))

// ---------- Projets ----------
function projectShape(data) {
  const d = upgradeLegacy(clone(data))
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
    sections: d.sections.map((s) => ({ title: s.title || '', blocks: s.blocks })),
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

function newProject() {
  editing.value = { id: null, slug: null, kind: 'project', baseSlug: '', form: emptyProject() }
  message.value = error.value = ''
}
function editProject(p) {
  editing.value = {
    id: p.row?.id ?? null,
    slug: p.slug,
    kind: 'project',
    baseSlug: rawProjects[p.slug] ? p.slug : '',
    form: projectShape(p.data),
  }
  message.value = error.value = ''
}
function duplicateProject(p) {
  const form = projectShape(p.data)
  form.title = `${form.title} (copie)`
  form.header.title = `${form.header.title} (copie)`
  qualifyImages(form, p.slug)
  editing.value = { id: null, slug: null, kind: 'project', baseSlug: '', form }
  message.value = error.value = ''
}

// ---------- Formations ----------
const emptyFormation = () => ({ icon: '🎓', title: '', subtitle: '', period: '', text: '', tags: '' })
function formationForm(d) {
  return { ...emptyFormation(), ...d, tags: (d.tags || []).map((t) => (t.url ? `${t.label} | ${t.url}` : t.label)).join('\n') }
}
function formationData(f) {
  return {
    icon: f.icon,
    title: f.title,
    subtitle: f.subtitle,
    period: f.period,
    text: f.text,
    tags: f.tags.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
      const [label, url] = l.split('|').map((x) => x.trim())
      return url ? { label, url } : { label }
    }),
  }
}
const formationRows = computed(() => remoteRows.value.filter((r) => r.kind === 'formation'))

function newFormation() {
  editing.value = { id: null, slug: null, kind: 'formation', form: emptyFormation() }
  message.value = error.value = ''
}
function editFormation(r) {
  editing.value = { id: r.id, slug: r.slug, kind: 'formation', form: formationForm(r.data) }
  message.value = error.value = ''
}

// ---------- Profil & contact ----------
const profileForm = ref(null)
function openProfile() {
  tab.value = 'profile'
  profileForm.value = clone(profile.value)
  message.value = error.value = ''
}
async function saveProfile() {
  busy.value = true
  error.value = message.value = ''
  const data = clone(profileForm.value)
  const q = supabase.from('content')
  const { error: e } = profileRow.value
    ? await q.update({ data }).eq('id', profileRow.value.id)
    : await q.insert({ kind: 'profile', slug: 'main', data })
  busy.value = false
  if (e) {
    error.value = /content_kind_check|check constraint/i.test(e.message)
      ? "La base n'accepte pas encore le profil : exécute supabase/migration-profil.sql dans Supabase (SQL Editor)."
      : e.message
    return
  }
  await loadRemote()
  message.value = 'Profil enregistré. Visible tout de suite sur la page d’accueil.'
}
async function resetProfile() {
  if (!profileRow.value || !confirm('Rétablir le profil et les contacts d’origine ?')) return
  const { error: e } = await supabase.from('content').delete().eq('id', profileRow.value.id)
  if (e) error.value = e.message
  else {
    await loadRemote()
    profileForm.value = clone(profile.value)
    message.value = 'Profil d’origine rétabli.'
  }
}

// ---------- Compétences ----------
const compForm = ref(null)
function openCompetences() {
  tab.value = 'competences'
  compForm.value = clone(competences.value)
  message.value = error.value = ''
}
async function saveCompetences() {
  busy.value = true
  error.value = message.value = ''
  const data = clone(compForm.value)
  const q = supabase.from('content')
  const { error: e } = competencesRow.value
    ? await q.update({ data }).eq('id', competencesRow.value.id)
    : await q.insert({ kind: 'competences', slug: 'main', data })
  busy.value = false
  if (e) {
    error.value = /content_kind_check|check constraint/i.test(e.message)
      ? "La base n'accepte pas encore ce contenu : exécute supabase/migration-competences.sql dans Supabase (SQL Editor)."
      : e.message
    return
  }
  await loadRemote()
  message.value = 'Compétences enregistrées. Visibles tout de suite sur le site.'
}
async function resetCompetences() {
  if (!competencesRow.value || !confirm('Rétablir les compétences d’origine ?')) return
  const { error: e } = await supabase.from('content').delete().eq('id', competencesRow.value.id)
  if (e) error.value = e.message
  else {
    await loadRemote()
    compForm.value = clone(competences.value)
    message.value = 'Compétences d’origine rétablies.'
  }
}

// ---------- Expériences ----------
const expForm = ref(null)
function openExperiences() {
  tab.value = 'experiences'
  expForm.value = clone(experiences.value)
  message.value = error.value = ''
}
async function saveExperiences() {
  busy.value = true
  error.value = message.value = ''
  const data = clone(expForm.value)
  data.items = data.items.filter((it) => it.title || it.company)
  for (const it of data.items) it.timeline = (it.timeline || []).filter((t) => t.period && t.period.trim())
  const q = supabase.from('content')
  const { error: e } = experiencesRow.value
    ? await q.update({ data }).eq('id', experiencesRow.value.id)
    : await q.insert({ kind: 'experiences', slug: 'main', data })
  busy.value = false
  if (e) {
    error.value = /content_kind_check|check constraint/i.test(e.message)
      ? "La base n'accepte pas encore ce contenu : exécute supabase/migration-competences.sql dans Supabase (SQL Editor)."
      : e.message
    return
  }
  await loadRemote()
  expForm.value = clone(experiences.value)
  message.value = 'Expériences enregistrées. Visibles tout de suite sur le site.'
}
async function resetExperiences() {
  if (!experiencesRow.value || !confirm('Rétablir les expériences d’origine ?')) return
  const { error: e } = await supabase.from('content').delete().eq('id', experiencesRow.value.id)
  if (e) error.value = e.message
  else {
    await loadRemote()
    expForm.value = clone(experiences.value)
    message.value = 'Expériences d’origine rétablies.'
  }
}

// ---------- Atouts & loisirs (une seule ligne « main » par type) ----------
function singleton(kind, tabName, current, row, savedMessage, resetMessage, clean = (d) => d) {
  const form = ref(null)
  const open = () => {
    tab.value = tabName
    form.value = clone(current.value)
    message.value = error.value = ''
  }
  async function save() {
    busy.value = true
    error.value = message.value = ''
    const data = clean(clone(form.value))
    const q = supabase.from('content')
    const { error: e } = row.value
      ? await q.update({ data }).eq('id', row.value.id)
      : await q.insert({ kind, slug: 'main', data })
    busy.value = false
    if (e) {
      error.value = /content_kind_check|check constraint/i.test(e.message)
        ? "La base n'accepte pas encore ce contenu : exécute supabase/migration-competences.sql dans Supabase (SQL Editor)."
        : e.message
      return
    }
    await loadRemote()
    form.value = clone(current.value)
    message.value = savedMessage
  }
  async function reset() {
    if (!row.value || !confirm("Rétablir la version d'origine ?")) return
    const { error: e } = await supabase.from('content').delete().eq('id', row.value.id)
    if (e) error.value = e.message
    else {
      await loadRemote()
      form.value = clone(current.value)
      message.value = resetMessage
    }
  }
  return { form, open, save, reset }
}

const cleanLevel = (it) => {
  if (it.level === '' || it.level === null || it.level === undefined) delete it.level
  else it.level = Number(it.level)
}
const atoutsAdmin = singleton('atouts', 'atouts', atouts, atoutsRow, 'Atouts enregistrés. Visibles tout de suite sur le site.', "Atouts d'origine rétablis.", (d) => {
  d.categories = d.categories.filter((c) => c.label || c.items.length)
  for (const c of d.categories) {
    c.items = c.items.filter((it) => it.title)
    c.items.forEach(cleanLevel)
  }
  return d
})
const loisirsAdmin = singleton('loisirs', 'loisirs', loisirs, loisirsRow, 'Loisirs enregistrés. Visibles tout de suite sur le site.', "Loisirs d'origine rétablis.", (d) => {
  d.items = d.items.filter((it) => it.title || it.label)
  d.impacts = d.impacts.filter((im) => im.title || im.text)
  return d
})

// ---------- Enregistrer / supprimer ----------
async function save() {
  const { id, kind, form } = editing.value
  const title = kind === 'project' ? form.title || form.header.title : form.title
  if (!title || !title.trim()) {
    error.value = 'Le titre est obligatoire.'
    return
  }
  let data = form
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
  error.value = message.value = ''
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

async function removeRow(row, label, text = 'Supprimer') {
  if (!confirm(`${text} « ${label} » ?`)) return
  const { error: e } = await supabase.from('content').delete().eq('id', row.id)
  if (e) error.value = e.message
  else {
    await loadRemote()
    message.value = text === 'Supprimer' ? 'Supprimé.' : 'Version d’origine rétablie.'
  }
}

async function upload(file) {
  const ext = (file.name.split('.').pop() || 'png').toLowerCase()
  const name = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'}.${ext}`
  const { error: e } = await supabase.storage.from('images').upload(name, file, { contentType: file.type })
  if (e) throw e
  return supabase.storage.from('images').getPublicUrl(name).data.publicUrl
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
    <div class="max-w-4xl mx-auto px-6 py-12">
      <h1 class="text-4xl font-bold text-white mb-8">Administration</h1>

      <p v-if="!ready" class="text-slate-400">Chargement…</p>

      <div v-else-if="!supabaseEnabled" class="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
        L'administration n'est pas configurée : les variables <code>VITE_SUPABASE_URL</code> et
        <code>VITE_SUPABASE_ANON_KEY</code> sont absentes. Voir le README.
      </div>

      <!-- Connexion -->
      <form v-else-if="!session" class="bg-slate-800/60 border border-indigo-500/30 rounded-2xl p-8 space-y-4 max-w-md" @submit.prevent="signIn">
        <h2 class="text-2xl font-bold text-indigo-200">Connexion</h2>
        <input v-model="login.email" type="email" placeholder="Email" required autocomplete="username" :class="input" />
        <input v-model="login.password" type="password" placeholder="Mot de passe" required autocomplete="current-password" :class="input" />
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
        <button :class="btnMain" :disabled="busy">Se connecter</button>
      </form>

      <template v-else>
        <div class="flex items-center justify-between mb-6 text-sm text-slate-400">
          <span>Connecté : {{ session.user.email }}</span>
          <button :class="btnGhost" @click="signOut">Se déconnecter</button>
        </div>

        <p v-if="message" class="mb-4 text-emerald-400">{{ message }}</p>
        <p v-if="error" class="mb-4 text-red-400">{{ error }}</p>

        <!-- Liste -->
        <template v-if="!editing">
          <div class="flex flex-wrap gap-3 mb-6">
            <button :class="tab === 'project' ? btnMain : btnGhost" @click="tab = 'project'">Projets</button>
            <button :class="tab === 'formation' ? btnMain : btnGhost" @click="tab = 'formation'">Formations</button>
            <button :class="tab === 'profile' ? btnMain : btnGhost" @click="openProfile">Profil & contact</button>
            <button :class="tab === 'competences' ? btnMain : btnGhost" @click="openCompetences">Compétences</button>
            <button :class="tab === 'experiences' ? btnMain : btnGhost" @click="openExperiences">Expériences</button>
            <button :class="tab === 'atouts' ? btnMain : btnGhost" @click="atoutsAdmin.open()">Atouts</button>
            <button :class="tab === 'loisirs' ? btnMain : btnGhost" @click="loisirsAdmin.open()">Loisirs</button>
            <button v-if="tab === 'project' || tab === 'formation'" :class="btnMain + ' ml-auto'" @click="tab === 'project' ? newProject() : newFormation()">+ Ajouter</button>
          </div>

          <div v-if="tab === 'profile' && profileForm" class="space-y-6">
            <p class="text-sm text-slate-400">
              Ces informations s'affichent dans « Profil & Contact » sur la page d'accueil.
            </p>
            <ProfileEditor :form="profileForm" :upload="upload" @error="(m) => (error = m)" />
            <div class="flex gap-3 sticky bottom-0 bg-slate-900/90 py-3">
              <button :class="btnMain" :disabled="busy" @click="saveProfile">{{ busy ? 'Patiente…' : 'Enregistrer' }}</button>
              <button v-if="profileRow" :class="btnDanger" @click="resetProfile">Rétablir l'original</button>
            </div>
          </div>

          <div v-else-if="tab === 'competences' && compForm" class="space-y-6">
            <p class="text-sm text-slate-400">
              Chaque cadre correspond à une formation (BUT Informatique, Bachelor, Master…) et contient ses cartes de compétences.
            </p>
            <CompetencesEditor :form="compForm" />
            <div class="flex gap-3 sticky bottom-0 bg-slate-900/90 py-3">
              <button :class="btnMain" :disabled="busy" @click="saveCompetences">{{ busy ? 'Patiente…' : 'Enregistrer' }}</button>
              <button v-if="competencesRow" :class="btnDanger" @click="resetCompetences">Rétablir l'original</button>
            </div>
          </div>

          <div v-else-if="tab === 'experiences' && expForm" class="space-y-6">
            <ExperiencesEditor :form="expForm" />
            <div class="flex gap-3 sticky bottom-0 bg-slate-900/90 py-3">
              <button :class="btnMain" :disabled="busy" @click="saveExperiences">{{ busy ? 'Patiente…' : 'Enregistrer' }}</button>
              <button v-if="experiencesRow" :class="btnDanger" @click="resetExperiences">Rétablir l'original</button>
            </div>
          </div>

          <div v-else-if="tab === 'atouts' && atoutsAdmin.form.value" class="space-y-6">
            <AtoutsEditor :form="atoutsAdmin.form.value" />
            <div class="flex gap-3 sticky bottom-0 bg-slate-900/90 py-3">
              <button :class="btnMain" :disabled="busy" @click="atoutsAdmin.save()">{{ busy ? 'Patiente…' : 'Enregistrer' }}</button>
              <button v-if="atoutsRow" :class="btnDanger" @click="atoutsAdmin.reset()">Rétablir l'original</button>
            </div>
          </div>

          <div v-else-if="tab === 'loisirs' && loisirsAdmin.form.value" class="space-y-6">
            <LoisirsEditor :form="loisirsAdmin.form.value" />
            <div class="flex gap-3 sticky bottom-0 bg-slate-900/90 py-3">
              <button :class="btnMain" :disabled="busy" @click="loisirsAdmin.save()">{{ busy ? 'Patiente…' : 'Enregistrer' }}</button>
              <button v-if="loisirsRow" :class="btnDanger" @click="loisirsAdmin.reset()">Rétablir l'original</button>
            </div>
          </div>

          <template v-else-if="tab === 'project'">
            <p class="text-sm text-slate-400 mb-4">
              Tous les projets sont modifiables, y compris ceux du dépôt : la version modifiée remplace l'original.
              « Dupliquer » sert de modèle pour créer une page similaire.
            </p>
            <ul class="space-y-3">
              <li v-for="p in editableProjects" :key="p.slug" class="flex flex-wrap items-center gap-3 bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4">
                <span class="flex-1 min-w-[10rem] font-semibold text-white">
                  {{ p.data.title }}
                  <span class="ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{{ p.source }}</span>
                  <span v-if="p.data.publie === false" class="ml-1 text-xs text-amber-300">(masqué)</span>
                </span>
                <router-link :to="'/projects/' + p.slug" :class="btnGhost">Voir</router-link>
                <button :class="btnGhost" @click="editProject(p)">Modifier</button>
                <button :class="btnGhost" @click="duplicateProject(p)">Dupliquer</button>
                <button v-if="p.row && p.source === 'modifié'" :class="btnDanger" @click="removeRow(p.row, p.data.title, 'Rétablir l’original de')">Rétablir l'original</button>
                <button v-else-if="p.row" :class="btnDanger" @click="removeRow(p.row, p.data.title)">Supprimer</button>
              </li>
            </ul>
          </template>

          <template v-else-if="tab === 'formation'">
            <p v-if="!formationRows.length" class="text-slate-400">Aucune formation ajoutée ici. Celles des fichiers du dépôt n'apparaissent pas dans cette liste.</p>
            <ul class="space-y-3">
              <li v-for="r in formationRows" :key="r.id" class="flex items-center gap-3 bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4">
                <span class="flex-1 font-semibold text-white">{{ r.data.title }}</span>
                <button :class="btnGhost" @click="editFormation(r)">Modifier</button>
                <button :class="btnDanger" @click="removeRow(r, r.data.title)">Supprimer</button>
              </li>
            </ul>
          </template>
        </template>

        <!-- Formulaire -->
        <form v-else class="space-y-5" @submit.prevent="save">
          <h2 class="text-2xl font-bold text-indigo-200">
            {{ editing.id || editing.slug ? 'Modifier' : 'Ajouter' }} {{ editing.kind === 'project' ? 'un projet' : 'une formation' }}
          </h2>

          <template v-if="editing.kind === 'formation'">
            <div class="grid grid-cols-[80px_1fr] gap-3">
              <input v-model="editing.form.icon" placeholder="🎓" :class="input" />
              <input v-model="editing.form.title" placeholder="Titre (ex. BUT Informatique)" required :class="input" />
            </div>
            <input v-model="editing.form.subtitle" placeholder="Établissement / lieu" :class="input" />
            <input v-model="editing.form.period" placeholder="Période (ex. 2023 — Présent)" :class="input" />
            <textarea v-model="editing.form.text" rows="3" placeholder="Description (facultatif)" :class="input"></textarea>
            <label class="block text-sm text-slate-400">Étiquettes, une par ligne. Pour un lien : <code>Texte | https://...</code>
              <textarea v-model="editing.form.tags" rows="4" :class="input + ' mt-1'"></textarea>
            </label>
          </template>

          <ProjectEditor
            v-else
            :form="editing.form"
            :base-slug="editing.baseSlug"
            :upload="upload"
            @error="(m) => (error = m)"
          />

          <div class="flex gap-3 pt-4 sticky bottom-0 bg-slate-900/90 py-3">
            <button :class="btnMain" :disabled="busy">{{ busy ? 'Patiente…' : 'Enregistrer' }}</button>
            <button type="button" :class="btnGhost" @click="editing = null">Annuler</button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>
