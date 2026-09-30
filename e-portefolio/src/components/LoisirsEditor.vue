<script setup>
// Édite en place l'objet `form` (même format que src/content/loisirs.json).
import EdField from './admin/EdField.vue'
import EdPanel from './admin/EdPanel.vue'
import EdItem from './admin/EdItem.vue'
import EdAdd from './admin/EdAdd.vue'
import { move, duplicate } from './admin/ed.js'

defineProps({ form: { type: Object, required: true } })
</script>

<template>
  <div class="space-y-6">
    <EdPanel title="Page">
      <div class="grid md:grid-cols-2 gap-3">
        <EdField label="Titre de la page"><input v-model="form.title" class="ed-input" /></EdField>
        <EdField label="Sous-titre" hint="Facultatif"><input v-model="form.subtitle" class="ed-input" /></EdField>
      </div>
    </EdPanel>

    <EdPanel title="Loisirs & passions" description="Chaque passion s'affiche sous forme de bulle avec un titre et une description.">
      <EdItem
        v-for="(it, i) in form.items"
        :key="i"
        :icon="it.icon"
        :title="it.title || it.label"
        :subtitle="it.description"
        :open="!it.title && !it.label"
        :first="i === 0"
        :last="i === form.items.length - 1"
        confirm="Supprimer ce loisir ?"
        @up="move(form.items, i, -1)"
        @down="move(form.items, i, 1)"
        @duplicate="duplicate(form.items, i)"
        @remove="form.items.splice(i, 1)"
      >
        <div class="grid grid-cols-[5rem_1fr] gap-3">
          <EdField label="Icône"><input v-model="it.icon" class="ed-input" placeholder="🎮" /></EdField>
          <EdField label="Texte sur la bulle"><input v-model="it.label" class="ed-input" placeholder="Jeux Vidéo" /></EdField>
        </div>
        <EdField label="Titre"><input v-model="it.title" class="ed-input" placeholder="Jeux Vidéo & Gaming" /></EdField>
        <EdField label="Description"><textarea v-model="it.description" rows="3" class="ed-input"></textarea></EdField>
        <EdField label="Teinte de la bulle">
          <select v-model="it.shade" class="ed-input">
            <option value="500">Indigo clair</option>
            <option value="600">Indigo foncé</option>
          </select>
        </EdField>
      </EdItem>
      <EdAdd @click="form.items.push({ icon: '⭐', label: '', title: '', description: '', shade: '500' })">Loisir</EdAdd>
    </EdPanel>

    <EdPanel title="Impact sur mon travail" description="Bloc « Comment mes passions influencent mon travail ». Masqué s'il n'y a aucune carte.">
      <EdField label="Titre du bloc"><input v-model="form.impactTitle" class="ed-input" /></EdField>
      <EdItem
        v-for="(im, i) in form.impacts"
        :key="i"
        nested
        :title="im.title"
        :subtitle="im.text"
        :open="!im.title && !im.text"
        :first="i === 0"
        :last="i === form.impacts.length - 1"
        confirm="Supprimer cette carte ?"
        @up="move(form.impacts, i, -1)"
        @down="move(form.impacts, i, 1)"
        @duplicate="duplicate(form.impacts, i)"
        @remove="form.impacts.splice(i, 1)"
      >
        <EdField label="Titre"><input v-model="im.title" class="ed-input" placeholder="🎨 Créativité & Design" /></EdField>
        <EdField label="Texte"><textarea v-model="im.text" rows="3" class="ed-input"></textarea></EdField>
      </EdItem>
      <EdAdd @click="form.impacts.push({ title: '', text: '' })">Carte</EdAdd>
    </EdPanel>
  </div>
</template>
