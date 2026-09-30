<script setup>
import { ref, onMounted } from 'vue'

// Élément de liste repliable (expérience, section, carte, catégorie…) avec la même barre d'actions partout :
// ↑ ↓ monter/descendre · ⧉ dupliquer · ✕ supprimer (avec confirmation si `confirm` est renseigné).
const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' },
  open: { type: Boolean, default: false },
  first: { type: Boolean, default: false },
  last: { type: Boolean, default: false },
  nested: { type: Boolean, default: false }, // élément imbriqué dans un autre : fond plus discret
  noDuplicate: { type: Boolean, default: false },
  confirm: { type: String, default: '' }, // message de confirmation avant suppression
  emptyTitle: { type: String, default: 'Sans titre' },
})
const emit = defineEmits(['up', 'down', 'duplicate', 'remove'])

// `open` n'est qu'un état de départ : l'élément ne se referme pas tout seul pendant la saisie.
const el = ref(null)
onMounted(() => {
  if (props.open && el.value) el.value.open = true
})

const askRemove = () => {
  if (!props.confirm || window.confirm(props.confirm)) emit('remove')
}
</script>

<template>
  <details
    ref="el"
    class="ed-item rounded-xl border"
    :class="nested ? 'ed-card' : 'bg-slate-800/60 border-indigo-500/30'"
  >
    <summary>
      <span class="ed-chevron" aria-hidden="true">▸</span>
      <span v-if="icon" class="text-xl leading-none">{{ icon }}</span>
      <span class="min-w-0 flex-1">
        <span class="block truncate font-semibold text-indigo-200">{{ title || emptyTitle }}</span>
        <span v-if="subtitle" class="block truncate text-xs text-slate-400">{{ subtitle }}</span>
      </span>
      <span class="flex items-center gap-1 shrink-0" @click.stop.prevent>
        <button type="button" class="ed-icon-btn" title="Monter" aria-label="Monter" :disabled="first" @click="emit('up')">↑</button>
        <button type="button" class="ed-icon-btn" title="Descendre" aria-label="Descendre" :disabled="last" @click="emit('down')">↓</button>
        <button v-if="!noDuplicate" type="button" class="ed-icon-btn" title="Dupliquer" aria-label="Dupliquer" @click="emit('duplicate')">⧉</button>
        <button
          type="button"
          class="ed-icon-btn ed-icon-btn-danger"
          title="Supprimer"
          aria-label="Supprimer"
          @click="askRemove"
        >✕</button>
      </span>
    </summary>
    <div class="p-4 space-y-4"><slot /></div>
  </details>
</template>
