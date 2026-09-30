<script setup>
// Édite en place l'objet `form` (même format que src/content/experiences.json).
import ListInput from './ListInput.vue'
import EdField from './admin/EdField.vue'
import EdPanel from './admin/EdPanel.vue'
import EdItem from './admin/EdItem.vue'
import EdRow from './admin/EdRow.vue'
import EdAdd from './admin/EdAdd.vue'
import { move, duplicate } from './admin/ed.js'

defineProps({ form: { type: Object, required: true } })

const newItem = () => ({ icon: '💼', title: '', company: '', period: '', description: '', tags: [], timeline: [] })
</script>

<template>
  <div class="space-y-6">
    <EdPanel title="Page">
      <div class="grid md:grid-cols-2 gap-3">
        <EdField label="Titre de la page"><input v-model="form.title" class="ed-input" /></EdField>
        <EdField label="Sous-titre" hint="Facultatif"><input v-model="form.subtitle" class="ed-input" /></EdField>
      </div>
      <EdField label="Titre de la frise chronologique"><input v-model="form.timelineTitle" class="ed-input" /></EdField>
    </EdPanel>

    <EdPanel title="Expériences" description="Affichées dans l'ordre de la liste (la plus récente en premier). La frise chronologique est générée à partir des dates.">
      <template #actions>
        <EdAdd @click="form.items.unshift(newItem())">Nouvelle expérience</EdAdd>
      </template>

      <EdItem
        v-for="(it, i) in form.items"
        :key="i"
        :icon="it.icon"
        :title="it.title"
        :subtitle="[it.company, it.period].filter(Boolean).join(' · ')"
        empty-title="Nouvelle expérience"
        :open="!it.title"
        :first="i === 0"
        :last="i === form.items.length - 1"
        :confirm="'Supprimer l’expérience « ' + (it.title || 'sans titre') + ' » ?'"
        @up="move(form.items, i, -1)"
        @down="move(form.items, i, 1)"
        @duplicate="duplicate(form.items, i)"
        @remove="form.items.splice(i, 1)"
      >
        <div class="grid grid-cols-[5rem_1fr] gap-3">
          <EdField label="Icône"><input v-model="it.icon" class="ed-input" placeholder="🧑‍💻" /></EdField>
          <EdField label="Intitulé du poste"><input v-model="it.title" class="ed-input" placeholder="Stage - Refonte Applicative" /></EdField>
        </div>
        <EdField label="Entreprise" hint="Format « Entreprise — Ville » : la frise affichera « Entreprise (Ville) »">
          <input v-model="it.company" class="ed-input" placeholder="Savoy International — Cluses" />
        </EdField>

        <div class="grid sm:grid-cols-[9rem_1fr] gap-3">
          <EdField label="Libellé">
            <select v-model="it.periodLabel" class="ed-input">
              <option value="">Période</option>
              <option value="Périodes">Périodes</option>
            </select>
          </EdField>
          <EdField label="Dates"><input v-model="it.period" class="ed-input" placeholder="01 Septembre 2025 - Présent" /></EdField>
        </div>

        <EdField label="Missions"><textarea v-model="it.description" rows="4" class="ed-input"></textarea></EdField>
        <EdField label="Étiquettes" hint="Séparées par des virgules"><ListInput v-model="it.tags" mode="comma" :rows="1" /></EdField>

        <div class="space-y-3">
          <p class="ed-label !mb-0">Entrées dans la frise chronologique</p>
          <p class="ed-hint !mt-0">Une entrée par période. Sans entrée, les « Dates » ci-dessus sont utilisées.</p>
          <EdRow
            v-for="(t, k) in it.timeline"
            :key="k"
            :first="k === 0"
            :last="k === it.timeline.length - 1"
            @up="move(it.timeline, k, -1)"
            @down="move(it.timeline, k, 1)"
            @remove="it.timeline.splice(k, 1)"
          >
            <input v-model="t.period" class="ed-input" placeholder="Juin 2023 - Août 2023" aria-label="Période de la frise" />
          </EdRow>
          <EdAdd @click="(it.timeline = it.timeline || []).push({ period: '' })">Période dans la frise</EdAdd>
        </div>
      </EdItem>
    </EdPanel>
  </div>
</template>
