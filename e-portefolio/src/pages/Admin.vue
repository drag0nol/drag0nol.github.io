<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase, supabaseEnabled } from '@/lib/supabase'
import { remoteRows, loadRemote } from '@/content/remote'

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
const editing = ref(null) // { id, kind, form }

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

const rows = computed(() => remoteRows.value.filter((r) => r.kind === tab.value))
const titleOf = (r) => r.data.title || r.slug

const lines = (s) => s.split('\n').map((l) => l.trim()).filter(Boolean)
const csv = (s) => s.split(',').map((l) => l.trim()).filter(Boolean)

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const emptyProject = () => ({
  publie: true,
  title: '',
  category: '',
  summary: '',
  status: '',
  order: 0,
  tags: '',
  subtitle: '',
  meta: '',
  cover: '',
  sections: [{ title: '', text: '', bullets: '', images: [] }],
  links: [],
})
const emptyFormation = () => ({ icon: '🎓', title: '', subtitle: '', period: '', text: '', tags: '' })

// Base de données -> formulaire
function toForm(kind, d) {
  if (kind === 'formation') {
    return {
      ...emptyFormation(),
      ...d,
      tags: (d.tags || []).map((t) => (t.url ? `${t.label} | ${t.url}` : t.label)).join('\n'),
    }
  }
  return {
    ...emptyProject(),
    ...d,
    tags: (d.tags || []).join(', '),
    meta: (d.meta || []).join('\n'),
    sections: (d.sections || []).map((s) => ({
      title: s.title || '',
      text: [].concat(s.text || []).join('\n\n'),
      bullets: [].concat(s.bullets || []).join('\n'),
      images: (s.images || []).map((i) => ({ url: i.url, caption: i.caption || '' })),
    })),
    links: d.links || [],
  }
}

// Formulaire -> base de données
function toData(kind, f) {
  if (kind === 'formation') {
    return {
      icon: f.icon,
      title: f.title,
      subtitle: f.subtitle,
      period: f.period,
      text: f.text,
      tags: lines(f.tags).map((l) => {
        const [label, url] = l.split('|').map((x) => x.trim())
        return url ? { label, url } : { label }
      }),
    }
  }
  return {
    publie: f.publie,
    title: f.title,
    category: f.category,
    summary: f.summary,
    status: f.status,
    order: Number(f.order) || 0,
    tags: csv(f.tags),
    subtitle: f.subtitle,
    meta: lines(f.meta),
    cover: f.cover,
    sections: f.sections.map((s) => ({
      title: s.title,
      text: s.text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      bullets: lines(s.bullets),
      images: s.images,
    })),
    links: f.links.filter((l) => l.label && l.url),
  }
}

function startNew() {
  editing.value = { id: null, slug: null, kind: tab.value, form: tab.value === 'project' ? emptyProject() : emptyFormation() }
  message.value = error.value = ''
}

function startEdit(r) {
  editing.value = { id: r.id, slug: r.slug, kind: r.kind, form: toForm(r.kind, r.data) }
  message.value = error.value = ''
}

async function save() {
  const { id, kind, form } = editing.value
  if (!form.title.trim()) {
    error.value = 'Le titre est obligatoire.'
    return
  }
  busy.value = true
  error.value = message.value = ''
  const data = toData(kind, form)
  const slug = editing.value.slug || slugify(form.title) || String(Date.now())
  const q = supabase.from('content')
  const { error: e } = id
    ? await q.update({ data }).eq('id', id)
    : await q.insert({ kind, slug, data })
  busy.value = false
  if (e) {
    error.value = e.code === '23505' ? 'Un élément avec ce titre existe déjà.' : e.message
    return
  }
  await loadRemote()
  editing.value = null
  message.value = 'Enregistré. Visible tout de suite sur le site.'
}

async function remove(r) {
  if (!confirm(`Supprimer « ${titleOf(r)} » ?`)) return
  const { error: e } = await supabase.from('content').delete().eq('id', r.id)
  if (e) error.value = e.message
  else {
    await loadRemote()
    message.value = 'Supprimé.'
  }
}

async function upload(file) {
  const name = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'}.${file.name.split('.').pop().toLowerCase()}`
  const { error: e } = await supabase.storage.from('images').upload(name, file, { contentType: file.type })
  if (e) throw e
  return supabase.storage.from('images').getPublicUrl(name).data.publicUrl
}

async function onImages(ev, section) {
  error.value = ''
  busy.value = true
  try {
    for (const file of ev.target.files) section.images.push({ url: await upload(file), caption: '' })
  } catch (e) {
    error.value = "Envoi de l'image impossible : " + e.message
  }
  busy.value = false
  ev.target.value = ''
}

async function onCover(ev) {
  error.value = ''
  busy.value = true
  try {
    editing.value.form.cover = await upload(ev.target.files[0])
  } catch (e) {
    error.value = "Envoi de l'image impossible : " + e.message
  }
  busy.value = false
  ev.target.value = ''
}

const addSection = () => editing.value.form.sections.push({ title: '', text: '', bullets: '', images: [] })
const addLink = () => editing.value.form.links.push({ label: '', url: '' })
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
          <div class="flex gap-3 mb-6">
            <button :class="tab === 'project' ? btnMain : btnGhost" @click="tab = 'project'">Projets</button>
            <button :class="tab === 'formation' ? btnMain : btnGhost" @click="tab = 'formation'">Formations</button>
            <button :class="btnMain + ' ml-auto'" @click="startNew">+ Ajouter</button>
          </div>

          <p v-if="!rows.length" class="text-slate-400">Rien d'ajouté ici pour l'instant. Le contenu des fichiers du dépôt n'apparaît pas dans cette liste.</p>
          <ul class="space-y-3">
            <li v-for="r in rows" :key="r.id" class="flex items-center gap-3 bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4">
              <span class="flex-1 font-semibold text-white">{{ titleOf(r) }}
                <span v-if="r.data.publie === false" class="ml-2 text-xs text-amber-300">(masqué)</span>
              </span>
              <button :class="btnGhost" @click="startEdit(r)">Modifier</button>
              <button :class="btnDanger" @click="remove(r)">Supprimer</button>
            </li>
          </ul>
        </template>

        <!-- Formulaire -->
        <form v-else class="space-y-5" @submit.prevent="save">
          <h2 class="text-2xl font-bold text-indigo-200">
            {{ editing.id ? 'Modifier' : 'Ajouter' }} {{ editing.kind === 'project' ? 'un projet' : 'une formation' }}
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

          <template v-else>
            <input v-model="editing.form.title" placeholder="Titre du projet" required :class="input" />
            <div class="grid md:grid-cols-2 gap-3">
              <input v-model="editing.form.category" placeholder="Catégorie (ex. SAE — Jeu)" :class="input" />
              <input v-model="editing.form.status" placeholder="Badge (ex. EN COURS)" :class="input" />
            </div>
            <textarea v-model="editing.form.summary" rows="2" placeholder="Résumé affiché sur la carte" :class="input"></textarea>
            <input v-model="editing.form.tags" placeholder="Technologies, séparées par des virgules" :class="input" />
            <input v-model="editing.form.subtitle" placeholder="Sous-titre de la page du projet" :class="input" />
            <label class="block text-sm text-slate-400">Infos rapides, une par ligne (ex. 👥 Projet en équipe de 2)
              <textarea v-model="editing.form.meta" rows="2" :class="input + ' mt-1'"></textarea>
            </label>
            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <label>Image de la carte <input type="file" accept="image/*" @change="onCover" class="block mt-1" /></label>
              <img v-if="editing.form.cover" :src="editing.form.cover" class="h-16 rounded" />
              <label class="ml-auto flex items-center gap-2"><input type="checkbox" v-model="editing.form.publie" /> Publié</label>
              <label class="flex items-center gap-2">Ordre <input type="number" v-model="editing.form.order" :class="input + ' w-20'" /></label>
            </div>

            <div v-for="(s, i) in editing.form.sections" :key="i" class="bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4 space-y-3">
              <div class="flex gap-3">
                <input v-model="s.title" :placeholder="'Titre de la section ' + (i + 1)" :class="input" />
                <button type="button" :class="btnDanger" @click="editing.form.sections.splice(i, 1)">✕</button>
              </div>
              <textarea v-model="s.text" rows="4" placeholder="Texte (une ligne vide = nouveau paragraphe)" :class="input"></textarea>
              <textarea v-model="s.bullets" rows="3" placeholder="Liste à puces, un point par ligne" :class="input"></textarea>
              <div v-for="(img, j) in s.images" :key="img.url" class="flex items-center gap-3">
                <img :src="img.url" class="h-14 rounded" />
                <input v-model="img.caption" placeholder="Légende" :class="input" />
                <button type="button" :class="btnDanger" @click="s.images.splice(j, 1)">✕</button>
              </div>
              <label class="block text-sm text-slate-400">Ajouter des images
                <input type="file" accept="image/*" multiple class="block mt-1" @change="onImages($event, s)" />
              </label>
            </div>
            <button type="button" :class="btnGhost" @click="addSection">+ Section</button>

            <div v-for="(l, i) in editing.form.links" :key="i" class="flex gap-3">
              <input v-model="l.label" placeholder="Texte du bouton" :class="input" />
              <input v-model="l.url" placeholder="https://..." :class="input" />
              <button type="button" :class="btnDanger" @click="editing.form.links.splice(i, 1)">✕</button>
            </div>
            <button type="button" :class="btnGhost" @click="addLink">+ Lien</button>
          </template>

          <div class="flex gap-3 pt-4">
            <button :class="btnMain" :disabled="busy">{{ busy ? 'Patiente…' : 'Enregistrer' }}</button>
            <button type="button" :class="btnGhost" @click="editing = null">Annuler</button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>
