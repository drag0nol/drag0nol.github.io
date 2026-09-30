<script setup>
// Édite en place l'objet `form` (même format que src/content/experiences.json).
import ListInput from './ListInput.vue'

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
const newItem = () => ({ icon: '💼', title: '', company: '', period: '', description: '', tags: [], timeline: [] })
</script>

<template>
  <div class="space-y-8">
    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Page</legend>
      <input v-model="form.title" placeholder="Titre de la page" :class="input" />
      <input v-model="form.subtitle" placeholder="Sous-titre (facultatif)" :class="input" />
      <input v-model="form.timelineTitle" placeholder="Titre de la frise chronologique" :class="input" />
    </fieldset>

    <p class="text-sm text-slate-400">
      Les expériences s'affichent dans l'ordre de cette liste (la plus récente en premier).
      La frise chronologique est générée automatiquement à partir des dates.
    </p>

    <details v-for="(it, i) in form.items" :key="i" :class="box + ' !border-indigo-500/40'" :open="!it.title">
      <summary class="cursor-pointer font-semibold text-indigo-300">
        {{ it.icon }} {{ it.title || 'Nouvelle expérience' }}<span v-if="it.company" class="text-slate-400 font-normal"> — {{ it.company }}</span>
      </summary>
      <div class="space-y-3 mt-3">
        <div class="flex items-center gap-2">
          <input v-model="it.icon" placeholder="🧑‍💻" :class="input + ' !w-20'" />
          <input v-model="it.title" placeholder="Intitulé du poste (ex. Stage - Refonte Applicative)" :class="input" />
          <button type="button" :class="small" @click="move(form.items, i, -1)">↑</button>
          <button type="button" :class="small" @click="move(form.items, i, 1)">↓</button>
          <button type="button" :class="small" @click="duplicate(form.items, i)">Dupliquer</button>
          <button type="button" :class="danger" @click="form.items.splice(i, 1)">✕</button>
        </div>
        <input v-model="it.company" placeholder="Entreprise — Ville (ex. Savoy International — Cluses)" :class="input" />

        <div class="grid grid-cols-[9rem_1fr] gap-2">
          <select v-model="it.periodLabel" :class="input">
            <option value="">Période</option>
            <option value="Périodes">Périodes</option>
          </select>
          <input v-model="it.period" placeholder="01 Septembre 2025 - Présent" :class="input" />
        </div>

        <textarea v-model="it.description" rows="4" placeholder="Missions, description" :class="input"></textarea>

        <label class="block text-sm text-slate-400">Étiquettes (séparées par des virgules)
          <ListInput v-model="it.tags" mode="comma" :rows="1" />
        </label>

        <div class="space-y-2">
          <p class="text-sm text-slate-400">
            Dates de la frise chronologique — une entrée par période. Sans entrée, la « Période » ci-dessus est utilisée.
          </p>
          <div v-for="(t, k) in it.timeline" :key="k" class="flex gap-2">
            <input v-model="t.period" placeholder="Juin 2023 - Août 2023" :class="input" />
            <button type="button" :class="danger" @click="it.timeline.splice(k, 1)">✕</button>
          </div>
          <button type="button" :class="small" @click="(it.timeline = it.timeline || []).push({ period: '' })">+ Période dans la frise</button>
        </div>
      </div>
    </details>

    <button type="button" :class="btn" @click="form.items.unshift(newItem())">+ Nouvelle expérience (en haut)</button>
  </div>
</template>
