<script setup>
// Barre d'actions unique (collée en bas de l'écran) : enregistrer, annuler, rétablir, état des modifications.
defineProps({
  dirty: { type: Boolean, default: false },
  busy: { type: Boolean, default: false },
  canReset: { type: Boolean, default: false },
  resetLabel: { type: String, default: "Rétablir l'original" },
  cancelLabel: { type: String, default: 'Annuler' },
  showCancel: { type: Boolean, default: false },
})
const emit = defineEmits(['save', 'cancel', 'reset'])
</script>

<template>
  <div class="sticky bottom-0 z-20 -mx-2 px-2 py-3 bg-slate-900/95 backdrop-blur border-t border-indigo-500/20 flex flex-wrap items-center gap-3">
    <button type="submit" class="ed-btn ed-btn-primary" :disabled="busy" @click.prevent="emit('save')">
      {{ busy ? 'Patiente…' : 'Enregistrer' }}
    </button>
    <button v-if="showCancel" type="button" class="ed-btn ed-btn-ghost" @click="emit('cancel')">{{ cancelLabel }}</button>
    <slot />
    <span v-if="dirty" class="text-sm text-amber-300 flex items-center gap-1.5"><span aria-hidden="true">●</span> Modifications non enregistrées</span>
    <span v-else class="text-sm text-slate-500">Tout est enregistré</span>
    <button v-if="canReset" type="button" class="ed-btn ed-btn-danger ml-auto" @click="emit('reset')">{{ resetLabel }}</button>
  </div>
</template>
