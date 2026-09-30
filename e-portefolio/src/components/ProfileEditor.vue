<script setup>
// Édite en place l'objet `form` (même format que src/content/profile.json).
import EdField from './admin/EdField.vue'
import EdPanel from './admin/EdPanel.vue'
import EdRow from './admin/EdRow.vue'
import EdAdd from './admin/EdAdd.vue'
import { move } from './admin/ed.js'

const props = defineProps({
  form: { type: Object, required: true },
  upload: { type: Function, required: true }, // (File) => Promise<url>
})
const emit = defineEmits(['error'])

async function uploadCv(ev) {
  try {
    props.form.cv.url = await props.upload(ev.target.files[0])
  } catch (e) {
    emit('error', 'Envoi du CV impossible : ' + e.message)
  }
  ev.target.value = ''
}
</script>

<template>
  <div class="space-y-6">
    <EdPanel title="Informations personnelles" description="Carte de gauche de la section « Profil & Contact ».">
      <EdField label="Titre de la carte"><input v-model="form.infosTitle" class="ed-input" /></EdField>
      <div class="space-y-3">
        <EdRow
          v-for="(it, i) in form.infos"
          :key="i"
          :first="i === 0"
          :last="i === form.infos.length - 1"
          @up="move(form.infos, i, -1)"
          @down="move(form.infos, i, 1)"
          @remove="form.infos.splice(i, 1)"
        >
          <div class="grid grid-cols-[5rem_1fr] sm:grid-cols-[5rem_1fr_1fr] gap-3">
            <EdField label="Icône"><input v-model="it.icon" class="ed-input" placeholder="👤" /></EdField>
            <EdField label="Intitulé"><input v-model="it.label" class="ed-input" placeholder="Nom" /></EdField>
            <EdField label="Valeur" class="col-span-2 sm:col-span-1"><input v-model="it.value" class="ed-input" /></EdField>
          </div>
        </EdRow>
      </div>
      <EdAdd @click="form.infos.push({ icon: '', label: '', value: '' })">Information</EdAdd>
    </EdPanel>

    <EdPanel title="Moyens de contact" description="Carte de droite. Un lien rend la ligne cliquable.">
      <EdField label="Titre de la carte"><input v-model="form.contactTitle" class="ed-input" /></EdField>
      <div class="space-y-3">
        <EdRow
          v-for="(c, i) in form.contacts"
          :key="i"
          class="ed-card p-3"
          :first="i === 0"
          :last="i === form.contacts.length - 1"
          @up="move(form.contacts, i, -1)"
          @down="move(form.contacts, i, 1)"
          @remove="form.contacts.splice(i, 1)"
        >
          <div class="space-y-3">
            <div class="grid grid-cols-[5rem_1fr] sm:grid-cols-[5rem_1fr_1fr] gap-3">
              <EdField label="Icône"><input v-model="c.icon" class="ed-input" placeholder="✉️" /></EdField>
              <EdField label="Intitulé"><input v-model="c.label" class="ed-input" placeholder="Email" /></EdField>
              <EdField label="Texte affiché" class="col-span-2 sm:col-span-1"><input v-model="c.value" class="ed-input" /></EdField>
            </div>
            <EdField label="Lien" hint="mailto:moi@mail.fr · tel:0612345678 · https://… — vide = pas de lien">
              <input v-model="c.url" class="ed-input" />
            </EdField>
          </div>
        </EdRow>
      </div>
      <EdAdd @click="form.contacts.push({ icon: '', label: '', value: '', url: '' })">Moyen de contact</EdAdd>
    </EdPanel>

    <EdPanel title="CV" description="Les deux boutons de la carte de contact et le bouton du bas de la page d'accueil.">
      <div class="grid md:grid-cols-2 gap-3">
        <EdField label="Bouton de prévisualisation"><input v-model="form.cv.previewLabel" class="ed-input" /></EdField>
        <EdField label="Bouton de téléchargement"><input v-model="form.cv.downloadLabel" class="ed-input" /></EdField>
      </div>
      <EdField label="Adresse du CV (PDF)" hint="Vide = les boutons CV disparaissent">
        <input v-model="form.cv.url" class="ed-input" />
      </EdField>
      <EdField label="Remplacer le CV par un nouveau PDF"><input type="file" accept="application/pdf" @change="uploadCv" /></EdField>
      <a v-if="form.cv.url" :href="form.cv.url" target="_blank" rel="noopener" class="inline-block text-sm text-indigo-300 hover:text-indigo-200 underline">Ouvrir le CV actuel</a>
    </EdPanel>
  </div>
</template>
