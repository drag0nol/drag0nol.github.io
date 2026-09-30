<script setup>
// Édite en place l'objet `form` (même format que src/content/loisirs.json).
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
</script>

<template>
  <div class="space-y-8">
    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Page</legend>
      <input v-model="form.title" placeholder="Titre de la page" :class="input" />
      <input v-model="form.subtitle" placeholder="Sous-titre (facultatif)" :class="input" />
    </fieldset>

    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Loisirs & passions</legend>
      <div v-for="(it, i) in form.items" :key="i" :class="box + ' bg-slate-900/50'">
        <div class="flex items-center gap-2">
          <input v-model="it.icon" placeholder="🎮" :class="input + ' !w-20'" />
          <input v-model="it.label" placeholder="Texte sur la bulle (ex. Jeux Vidéo)" :class="input" />
          <button type="button" :class="small" @click="move(form.items, i, -1)">↑</button>
          <button type="button" :class="small" @click="move(form.items, i, 1)">↓</button>
          <button type="button" :class="small" @click="duplicate(form.items, i)">Dupliquer</button>
          <button type="button" :class="danger" @click="form.items.splice(i, 1)">✕</button>
        </div>
        <input v-model="it.title" placeholder="Titre (ex. Jeux Vidéo & Gaming)" :class="input" />
        <textarea v-model="it.description" rows="3" placeholder="Description" :class="input"></textarea>
        <select v-model="it.shade" :class="input + ' !w-auto'">
          <option value="500">Bulle indigo clair</option>
          <option value="600">Bulle indigo foncé</option>
        </select>
      </div>
      <button type="button" :class="small" @click="form.items.push({ icon: '⭐', label: '', title: '', description: '', shade: '500' })">+ Loisir</button>
    </fieldset>

    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Bloc « impact sur mon travail »</legend>
      <input v-model="form.impactTitle" placeholder="Titre du bloc (vide + aucune carte = bloc masqué)" :class="input" />
      <div v-for="(im, i) in form.impacts" :key="i" :class="box + ' bg-slate-900/50'">
        <div class="flex items-center gap-2">
          <input v-model="im.title" placeholder="🎨 Créativité & Design" :class="input" />
          <button type="button" :class="small" @click="move(form.impacts, i, -1)">↑</button>
          <button type="button" :class="small" @click="move(form.impacts, i, 1)">↓</button>
          <button type="button" :class="danger" @click="form.impacts.splice(i, 1)">✕</button>
        </div>
        <textarea v-model="im.text" rows="3" placeholder="Texte" :class="input"></textarea>
      </div>
      <button type="button" :class="small" @click="form.impacts.push({ title: '', text: '' })">+ Carte</button>
    </fieldset>
  </div>
</template>
