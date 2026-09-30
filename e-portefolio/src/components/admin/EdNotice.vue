<script setup>
// Message de retour (succès ou erreur), fermable.
defineProps({
  kind: { type: String, default: 'success' }, // 'success' | 'error'
})
const emit = defineEmits(['close'])
</script>

<template>
  <div
    role="status"
    class="flex items-start gap-3 rounded-xl border px-4 py-3 text-sm"
    :class="kind === 'error' ? 'bg-red-500/10 border-red-500/40 text-red-200' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'"
  >
    <span aria-hidden="true">{{ kind === 'error' ? '⚠️' : '✓' }}</span>
    <div class="flex-1"><slot /></div>
    <button type="button" class="opacity-70 hover:opacity-100" aria-label="Fermer" @click="emit('close')">✕</button>
  </div>
</template>
