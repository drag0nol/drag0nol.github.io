<script setup>
// Édite en place l'objet `form` (même format que src/content/competences.json).
import { allProjects } from '@/content/remote'

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

const newUe = () => ({ title: '', description: '', levels: [{ title: 'Niveau 1 : ', items: [{ text: '' }] }] })
const newSection = () => ({ title: '', subtitle: '', ues: [newUe()] })
const addLink = (item) => (item.links = [...(item.links || []), { label: '', to: '' }])
</script>

<template>
  <div class="space-y-8">
    <!-- Liens vers les projets proposés à la saisie -->
    <datalist id="routes-projets">
      <option v-for="p in allProjects" :key="p.slug" :value="'/projects/' + p.slug">{{ p.title }}</option>
    </datalist>

    <fieldset :class="box">
      <legend class="px-2 text-lg font-bold text-indigo-200">Page</legend>
      <input v-model="form.title" placeholder="Titre de la page" :class="input" />
      <input v-model="form.subtitle" placeholder="Sous-titre (facultatif)" :class="input" />
      <input v-model="form.heading" placeholder="Titre au-dessus des cadres (facultatif)" :class="input" />
      <input v-model="form.intro" placeholder="Phrase d'introduction (facultatif)" :class="input" />
    </fieldset>

    <fieldset v-for="(sec, si) in form.sections" :key="si" :class="box + ' !border-indigo-500/40'">
      <legend class="px-2 text-lg font-bold text-indigo-200">Cadre {{ si + 1 }} — {{ sec.title || 'sans titre' }}</legend>
      <div class="flex items-center gap-2">
        <input v-model="sec.title" placeholder="Nom de la formation (ex. Bachelor, Master)" :class="input" />
        <button type="button" :class="small" @click="move(form.sections, si, -1)">↑</button>
        <button type="button" :class="small" @click="move(form.sections, si, 1)">↓</button>
        <button type="button" :class="small" @click="duplicate(form.sections, si)">Dupliquer</button>
        <button type="button" :class="danger" @click="form.sections.splice(si, 1)">✕</button>
      </div>
      <input v-model="sec.subtitle" placeholder="Sous-titre du cadre (ex. École, parcours, période)" :class="input" />

      <details v-for="(ue, ui) in sec.ues" :key="ui" :class="box + ' bg-slate-900/50'" :open="!ue.title">
        <summary class="cursor-pointer font-semibold text-indigo-300">Compétence : {{ ue.title || 'sans titre' }}</summary>
        <div class="space-y-3 mt-3">
          <div class="flex items-center gap-2">
            <input v-model="ue.title" placeholder="Titre (ex. Réaliser — Conception & développement)" :class="input" />
            <button type="button" :class="small" @click="move(sec.ues, ui, -1)">↑</button>
            <button type="button" :class="small" @click="move(sec.ues, ui, 1)">↓</button>
            <button type="button" :class="small" @click="duplicate(sec.ues, ui)">Dupliquer</button>
            <button type="button" :class="danger" @click="sec.ues.splice(ui, 1)">✕</button>
          </div>
          <input v-model="ue.description" placeholder="Description courte (facultatif)" :class="input" />

          <div v-for="(lv, li) in ue.levels" :key="li" :class="box">
            <div class="flex items-center gap-2">
              <input v-model="lv.title" placeholder="Niveau 1 : Développer des applications simples" :class="input" />
              <button type="button" :class="small" @click="move(ue.levels, li, -1)">↑</button>
              <button type="button" :class="small" @click="move(ue.levels, li, 1)">↓</button>
              <button type="button" :class="danger" @click="ue.levels.splice(li, 1)">✕</button>
            </div>

            <div v-for="(it, ii) in lv.items" :key="ii" class="space-y-2 pb-3 border-b border-indigo-500/10 last:border-0">
              <div class="flex items-center gap-2">
                <input v-model="it.text" placeholder="AC11.01 : Implémenter des conceptions simples" :class="input" />
                <button type="button" :class="small" @click="move(lv.items, ii, -1)">↑</button>
                <button type="button" :class="small" @click="move(lv.items, ii, 1)">↓</button>
                <button type="button" :class="danger" @click="lv.items.splice(ii, 1)">✕</button>
              </div>
              <div v-for="(l, k) in it.links" :key="k" class="grid grid-cols-[1fr_2fr_auto] gap-2 pl-6">
                <input v-model="l.label" placeholder="Texte du bouton (ex. Savoy)" :class="input" />
                <input v-model="l.to" list="routes-projets" placeholder="/projects/... ou https://..." :class="input" />
                <button type="button" :class="danger" @click="it.links.splice(k, 1)">✕</button>
              </div>
              <button type="button" :class="small + ' ml-6'" @click="addLink(it)">+ Lien vers un projet</button>
            </div>
            <button type="button" :class="small" @click="lv.items.push({ text: '' })">+ Apprentissage critique</button>
          </div>
          <button type="button" :class="small" @click="ue.levels.push({ title: '', items: [{ text: '' }] })">+ Niveau</button>
        </div>
      </details>
      <button type="button" :class="btn" @click="sec.ues.push(newUe())">+ Compétence (carte)</button>
    </fieldset>

    <button type="button" :class="btn" @click="form.sections.push(newSection())">+ Nouveau cadre (autre formation)</button>
  </div>
</template>
