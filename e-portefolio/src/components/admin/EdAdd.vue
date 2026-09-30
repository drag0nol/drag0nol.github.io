<script setup>
// Bouton « + ajouter » uniforme.
defineProps({ big: { type: Boolean, default: false } })
</script>

<template>
  <button type="button" class="ed-btn ed-btn-ghost" :class="big ? '' : 'ed-btn-sm'">
    <span aria-hidden="true">+</span><slot />
  </button>
</template>
