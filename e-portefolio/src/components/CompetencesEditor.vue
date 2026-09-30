<script setup>
// Édite en place l'objet `form` (même format que src/content/competences.json).
import EdField from './admin/EdField.vue'
import EdPanel from './admin/EdPanel.vue'
import EdItem from './admin/EdItem.vue'
import EdRow from './admin/EdRow.vue'
import EdAdd from './admin/EdAdd.vue'
import { move, duplicate } from './admin/ed.js'
import { allProjects } from '@/content/remote'

defineProps({ form: { type: Object, required: true } })

const newUe = () => ({ title: '', description: '', levels: [{ title: 'Niveau 1 : ', items: [{ text: '' }] }] })
const newSection = () => ({ title: '', subtitle: '', ues: [newUe()] })
const addLink = (item) => (item.links = [...(item.links || []), { label: '', to: '' }])
const count = (ue) => ue.levels.reduce((n, l) => n + l.items.length, 0)
</script>

<template>
  <div class="space-y-6">
    <!-- Projets proposés à la saisie des liens -->
    <datalist id="routes-projets">
      <option v-for="p in allProjects" :key="p.slug" :value="'/projects/' + p.slug">{{ p.title }}</option>
    </datalist>

    <EdPanel title="Page">
      <div class="grid md:grid-cols-2 gap-3">
        <EdField label="Titre de la page"><input v-model="form.title" class="ed-input" /></EdField>
        <EdField label="Sous-titre" hint="Facultatif"><input v-model="form.subtitle" class="ed-input" /></EdField>
        <EdField label="Titre au-dessus des cadres" hint="Facultatif"><input v-model="form.heading" class="ed-input" /></EdField>
        <EdField label="Phrase d'introduction" hint="Facultatif"><input v-model="form.intro" class="ed-input" /></EdField>
      </div>
    </EdPanel>

    <EdPanel title="Cadres par formation" description="Un cadre par formation (BUT Informatique, Bachelor, Master…), contenant ses cartes de compétences.">
      <template #actions>
        <EdAdd @click="form.sections.push(newSection())">Nouveau cadre</EdAdd>
      </template>

      <EdItem
        v-for="(sec, si) in form.sections"
        :key="si"
        :title="sec.title"
        :subtitle="sec.ues.length + ' compétence(s)' + (sec.subtitle ? ' · ' + sec.subtitle : '')"
        empty-title="Cadre sans nom"
        :open="!sec.title"
        :first="si === 0"
        :last="si === form.sections.length - 1"
        :confirm="'Supprimer le cadre « ' + (sec.title || 'sans nom') + ' » et toutes ses compétences ?'"
        @up="move(form.sections, si, -1)"
        @down="move(form.sections, si, 1)"
        @duplicate="duplicate(form.sections, si)"
        @remove="form.sections.splice(si, 1)"
      >
        <div class="grid md:grid-cols-2 gap-3">
          <EdField label="Nom de la formation"><input v-model="sec.title" class="ed-input" placeholder="Bachelor, Master…" /></EdField>
          <EdField label="Sous-titre" hint="École, parcours, période"><input v-model="sec.subtitle" class="ed-input" /></EdField>
        </div>

        <EdItem
          v-for="(ue, ui) in sec.ues"
          :key="ui"
          nested
          :title="ue.title"
          :subtitle="ue.levels.length + ' niveau(x) · ' + count(ue) + ' apprentissage(s)'"
          empty-title="Compétence sans titre"
          :open="!ue.title"
          :first="ui === 0"
          :last="ui === sec.ues.length - 1"
          :confirm="'Supprimer la compétence « ' + (ue.title || 'sans titre') + ' » ?'"
          @up="move(sec.ues, ui, -1)"
          @down="move(sec.ues, ui, 1)"
          @duplicate="duplicate(sec.ues, ui)"
          @remove="sec.ues.splice(ui, 1)"
        >
          <EdField label="Titre de la compétence"><input v-model="ue.title" class="ed-input" placeholder="Réaliser — Conception & développement" /></EdField>
          <EdField label="Description" hint="Facultatif"><input v-model="ue.description" class="ed-input" /></EdField>

          <EdItem
            v-for="(lv, li) in ue.levels"
            :key="li"
            nested
            :title="lv.title"
            :subtitle="lv.items.length + ' apprentissage(s)'"
            empty-title="Niveau sans titre"
            :open="!lv.title"
            :first="li === 0"
            :last="li === ue.levels.length - 1"
            :confirm="'Supprimer ce niveau et ses ' + lv.items.length + ' apprentissage(s) ?'"
            no-duplicate
            @up="move(ue.levels, li, -1)"
            @down="move(ue.levels, li, 1)"
            @remove="ue.levels.splice(li, 1)"
          >
            <EdField label="Titre du niveau"><input v-model="lv.title" class="ed-input" placeholder="Niveau 1 : Développer des applications simples" /></EdField>

            <div class="space-y-3">
              <div v-for="(it, ii) in lv.items" :key="ii" class="ed-card p-3 space-y-3">
                <EdRow :first="ii === 0" :last="ii === lv.items.length - 1" @up="move(lv.items, ii, -1)" @down="move(lv.items, ii, 1)" @remove="lv.items.splice(ii, 1)">
                  <EdField label="Apprentissage critique"><input v-model="it.text" class="ed-input" placeholder="AC11.01 : Implémenter des conceptions simples" /></EdField>
                </EdRow>
                <div v-if="it.links && it.links.length" class="space-y-2 pl-4 border-l-2 border-indigo-500/30">
                  <EdRow v-for="(l, k) in it.links" :key="k" no-move @remove="it.links.splice(k, 1)">
                    <div class="grid sm:grid-cols-[1fr_2fr] gap-3">
                      <EdField label="Texte du bouton"><input v-model="l.label" class="ed-input" placeholder="Savoy" /></EdField>
                      <EdField label="Lien"><input v-model="l.to" list="routes-projets" class="ed-input" placeholder="/projects/… ou https://…" /></EdField>
                    </div>
                  </EdRow>
                </div>
                <EdAdd @click="addLink(it)">Lien vers un projet</EdAdd>
              </div>
              <EdAdd @click="lv.items.push({ text: '' })">Apprentissage critique</EdAdd>
            </div>
          </EdItem>
          <EdAdd @click="ue.levels.push({ title: '', items: [{ text: '' }] })">Niveau</EdAdd>
        </EdItem>
        <EdAdd @click="sec.ues.push(newUe())">Compétence (carte)</EdAdd>
      </EdItem>
    </EdPanel>
  </div>
</template>
