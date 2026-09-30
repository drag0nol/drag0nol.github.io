<script setup>
// Édite en place l'objet `form` (même format que src/content/profile.json).
const props = defineProps({
  form: { type: Object, required: true },
  upload: { type: Function, required: true }, // (File) => Promise<url>
})
const emit = defineEmits(['error'])

const input = 'w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400'
const small = 'px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm text-white'
const danger = 'px-2 py-1 rounded bg-red-600/80 hover:bg-red-600 text-sm text-white'
const box = 'bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4 space-y-3'

function move(list, i, d) {
  const j = i + d
  if (j < 0 || j >= list.length) return
  ;[list[i], list[j]] = [list[j], list[i]]
}

async function uploadCv(ev) {
  try {
    props.form.cv.url = await props.upload(ev.target.files[0])
  } catch (e) {
    emit('error', "Envoi du CV impossible : " + e.message)
  }
  ev.target.value = ''
}
</script>

<template>
  <div class="space-y-8">
    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Informations personnelles</legend>
      <input v-model="form.infosTitle" placeholder="Titre de la carte" :class="input" />
      <div v-for="(it, i) in form.infos" :key="i" class="grid grid-cols-[70px_1fr_1fr_auto] gap-2">
        <input v-model="it.icon" placeholder="👤" :class="input" />
        <input v-model="it.label" placeholder="Intitulé (ex. Nom)" :class="input" />
        <input v-model="it.value" placeholder="Valeur" :class="input" />
        <div class="flex gap-1">
          <button type="button" :class="small" @click="move(form.infos, i, -1)">↑</button>
          <button type="button" :class="small" @click="move(form.infos, i, 1)">↓</button>
          <button type="button" :class="danger" @click="form.infos.splice(i, 1)">✕</button>
        </div>
      </div>
      <button type="button" :class="small" @click="form.infos.push({ icon: '', label: '', value: '' })">+ Information</button>
    </fieldset>

    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Moyens de contact</legend>
      <input v-model="form.contactTitle" placeholder="Titre de la carte" :class="input" />
      <div v-for="(c, i) in form.contacts" :key="i" class="space-y-2 pb-3 border-b border-indigo-500/10 last:border-0">
        <div class="grid grid-cols-[70px_1fr_1fr_auto] gap-2">
          <input v-model="c.icon" placeholder="✉️" :class="input" />
          <input v-model="c.label" placeholder="Intitulé (ex. Email)" :class="input" />
          <input v-model="c.value" placeholder="Texte affiché" :class="input" />
          <div class="flex gap-1">
            <button type="button" :class="small" @click="move(form.contacts, i, -1)">↑</button>
            <button type="button" :class="small" @click="move(form.contacts, i, 1)">↓</button>
            <button type="button" :class="danger" @click="form.contacts.splice(i, 1)">✕</button>
          </div>
        </div>
        <input v-model="c.url" placeholder="Lien : mailto:moi@mail.fr · tel:0612345678 · https://... (vide = pas de lien)" :class="input" />
      </div>
      <button type="button" :class="small" @click="form.contacts.push({ icon: '', label: '', value: '', url: '' })">+ Moyen de contact</button>
    </fieldset>

    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">CV</legend>
      <div class="grid md:grid-cols-2 gap-3">
        <input v-model="form.cv.previewLabel" placeholder="Texte du bouton de prévisualisation" :class="input" />
        <input v-model="form.cv.downloadLabel" placeholder="Texte du bouton de téléchargement" :class="input" />
      </div>
      <input v-model="form.cv.url" placeholder="Adresse du CV (PDF) — vide = pas de boutons CV" :class="input" />
      <label class="block text-sm text-slate-400">Remplacer le CV par un nouveau PDF
        <input type="file" accept="application/pdf" @change="uploadCv" />
      </label>
      <a v-if="form.cv.url" :href="form.cv.url" target="_blank" rel="noopener" class="text-sm text-indigo-300 hover:text-indigo-200 underline">Ouvrir le CV actuel</a>
    </fieldset>
  </div>
</template>
