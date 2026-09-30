<script setup>
// Champ avec libellé visible (et aide facultative). Le contenu (input, select, textarea…) va dans le slot.
defineProps({
  label: { type: String, required: true },
  hint: { type: String, default: '' },
})
</script>

<template>
  <label class="block min-w-0">
    <span class="ed-label">{{ label }}</span>
    <slot />
    <span v-if="hint" class="ed-hint block">{{ hint }}</span>
  </label>
</template>
