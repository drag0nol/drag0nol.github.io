<script setup>
// Champs d'édition d'une carte (utilisé par le bloc « Cartes » et le carrousel).
import ListInput from './ListInput.vue'
import EdField from './admin/EdField.vue'
import EdRow from './admin/EdRow.vue'
import EdAdd from './admin/EdAdd.vue'
import { move } from './admin/ed.js'

defineProps({ card: { type: Object, required: true } })
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-[5rem_1fr] gap-3">
      <EdField label="Icône"><input v-model="card.icon" class="ed-input" placeholder="🎯" /></EdField>
      <EdField label="Titre"><input v-model="card.title" class="ed-input" placeholder="Titre de la carte" /></EdField>
    </div>
    <div v-if="card.icon" class="grid sm:grid-cols-2 gap-3">
      <EdField label="Position de l'icône">
        <select v-model="card.iconPosition" class="ed-input">
          <option value="left">À gauche du titre</option>
          <option value="top">Au-dessus, centrée</option>
        </select>
      </EdField>
      <EdField label="Taille de l'icône">
        <select v-model="card.iconSize" class="ed-input">
          <option value="3xl">Grande</option>
          <option value="2xl">Moyenne</option>
        </select>
      </EdField>
    </div>
    <EdField label="Sous-titre en gras" hint="Facultatif"><input v-model="card.subtitle" class="ed-input" /></EdField>
    <EdField label="Texte" hint="Facultatif — **gras** possible"><textarea v-model="card.text" rows="2" class="ed-input"></textarea></EdField>
    <EdField label="Liste" hint="Une entrée par ligne — **gras** possible"><ListInput v-model="card.items" :rows="4" /></EdField>
    <div class="grid sm:grid-cols-2 gap-3">
      <EdField label="Puces">
        <select v-model="card.bullet" class="ed-input">
          <option value="dot">•</option>
          <option value="arrow">▸</option>
          <option value="square">▫️</option>
          <option value="none">Sans puce</option>
        </select>
      </EdField>
      <EdField label="Taille du texte">
        <select v-model="card.size" class="ed-input">
          <option value="base">Normale</option>
          <option value="sm">Petite</option>
        </select>
      </EdField>
    </div>

    <div v-for="(g, gi) in card.extra" :key="gi" class="ed-card p-4 space-y-3">
      <EdRow :first="gi === 0" :last="gi === card.extra.length - 1" @up="move(card.extra, gi, -1)" @down="move(card.extra, gi, 1)" @remove="card.extra.splice(gi, 1)">
        <EdField label="Sous-titre du groupe"><input v-model="g.subtitle" class="ed-input" /></EdField>
      </EdRow>
      <EdField label="Liste du groupe"><ListInput v-model="g.items" :rows="3" /></EdField>
    </div>
    <EdAdd @click="(card.extra = card.extra || []).push({ subtitle: '', items: [] })">Second groupe (sous-titre + liste)</EdAdd>
  </div>
</template>
