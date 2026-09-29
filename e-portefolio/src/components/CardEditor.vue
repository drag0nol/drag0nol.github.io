<script setup>
// Champs d'édition d'une carte (utilisé par le bloc « Cartes » et le carrousel).
import ListInput from './ListInput.vue'

defineProps({ card: { type: Object, required: true } })

const input = 'w-full px-3 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400'
const small = 'px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm text-white'
const danger = 'px-2 py-1 rounded bg-red-600/80 hover:bg-red-600 text-sm text-white'
const box = 'bg-slate-800/60 border border-indigo-500/20 rounded-xl p-4 space-y-3 bg-slate-900/50'
</script>

<template>
  <div class="space-y-3">
    <div class="grid grid-cols-[70px_1fr] gap-2">
      <input v-model="card.icon" placeholder="🎯" :class="input" />
      <input v-model="card.title" placeholder="Titre de la carte" :class="input" />
    </div>
    <div v-if="card.icon" class="flex gap-3 text-sm">
      <select v-model="card.iconPosition" :class="input + ' w-auto'">
        <option value="left">Icône à gauche du titre</option>
        <option value="top">Icône au-dessus (centrée)</option>
      </select>
      <select v-model="card.iconSize" :class="input + ' w-auto'">
        <option value="3xl">Grande icône</option>
        <option value="2xl">Icône moyenne</option>
      </select>
    </div>
    <input v-model="card.subtitle" placeholder="Sous-titre en gras (facultatif)" :class="input" />
    <textarea v-model="card.text" rows="2" placeholder="Texte (facultatif, **gras**)" :class="input"></textarea>
    <label class="block text-sm text-slate-400">Liste (une entrée par ligne, **gras** possible)
      <ListInput v-model="card.items" :rows="4" />
    </label>
    <div class="flex gap-3 text-sm">
      <select v-model="card.bullet" :class="input + ' w-auto'">
        <option value="dot">Puce •</option>
        <option value="arrow">Puce ▸</option>
        <option value="square">Puce ▫️</option>
        <option value="none">Sans puce</option>
      </select>
      <select v-model="card.size" :class="input + ' w-auto'">
        <option value="base">Texte normal</option>
        <option value="sm">Petit texte</option>
      </select>
    </div>

    <div v-for="(g, gi) in card.extra" :key="gi" :class="box">
      <input v-model="g.subtitle" placeholder="Sous-titre du groupe" :class="input" />
      <ListInput v-model="g.items" :rows="3" />
      <button type="button" :class="danger" @click="card.extra.splice(gi, 1)">Retirer le groupe</button>
    </div>
    <button type="button" :class="small" @click="(card.extra = card.extra || []).push({ subtitle: '', items: [] })">+ Second groupe (sous-titre + liste)</button>
  </div>
</template>
