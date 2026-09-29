<script setup>
// Image avec légende. `img.maxHeight` (ex. "300px", "60vh", "20rem") limite la hauteur sans déformer ni rogner.
import { computed } from 'vue'

const props = defineProps({
  img: { type: Object, required: true },
  alt: { type: String, default: '' },
  compact: { type: Boolean, default: false }, // vignette de hauteur fixe (carrousel à plusieurs éléments)
})

const VALID = /^\d+(\.\d+)?(px|vh|rem|em|%)$/
const maxHeight = computed(() => (VALID.test(props.img.maxHeight || '') ? props.img.maxHeight : ''))
const contain = computed(() => props.img.fit === 'contain')

const wrapClass = computed(() =>
  maxHeight.value ? 'flex items-center justify-center' : contain.value ? 'flex items-center justify-center h-40' : '',
)
const imgClass = computed(() =>
  maxHeight.value
    ? 'w-auto max-w-full object-contain'
    : contain.value
      ? 'h-full w-auto object-contain'
      : props.compact
        ? 'w-full h-56 object-cover'
        : 'w-full h-auto object-cover',
)
</script>

<template>
  <div>
    <p v-if="img.caption" class="text-slate-400 text-sm mb-2">📸 {{ img.caption }}</p>
    <div :class="wrapClass" class="bg-slate-800/50 rounded-lg border border-indigo-500/30 overflow-hidden shadow-lg">
      <img
        :src="img.src"
        :alt="img.caption || alt"
        :class="imgClass"
        :style="maxHeight ? { maxHeight } : undefined"
        loading="lazy"
      />
    </div>
  </div>
</template>
