<script setup>
// Ligne simple d'une liste (badge, point de liste, lien…) : champs à gauche, actions ↑ ↓ ✕ à droite.
defineProps({
  first: { type: Boolean, default: false },
  last: { type: Boolean, default: false },
  noMove: { type: Boolean, default: false },
})
const emit = defineEmits(['up', 'down', 'remove'])
</script>

<template>
  <div class="flex items-end gap-2">
    <div class="flex-1 min-w-0"><slot /></div>
    <div class="flex items-center gap-1 pb-0.5 shrink-0">
      <template v-if="!noMove">
        <button type="button" class="ed-icon-btn" title="Monter" aria-label="Monter" :disabled="first" @click="emit('up')">↑</button>
        <button type="button" class="ed-icon-btn" title="Descendre" aria-label="Descendre" :disabled="last" @click="emit('down')">↓</button>
      </template>
      <button type="button" class="ed-icon-btn ed-icon-btn-danger" title="Supprimer" aria-label="Supprimer" @click="emit('remove')">✕</button>
    </div>
  </div>
</template>
