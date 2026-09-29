<script setup>
// Hauteur maximale d'une image : valeur + unité. Vide = pas de limite.
// px : taille exacte · vh : % de la hauteur de l'écran (s'adapte à l'appareil) · rem : relatif à la taille du texte.
import { ref, watch } from 'vue'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue'])

const UNITS = ['px', 'vh', 'rem']
const parse = (v) => {
  const m = /^(\d+(?:\.\d+)?)(px|vh|rem)$/.exec(v || '')
  return m ? { n: m[1], unit: m[2] } : { n: '', unit: 'px' }
}

const init = parse(props.modelValue)
const n = ref(init.n)
const unit = ref(init.unit)

watch(
  () => props.modelValue,
  (v) => {
    if (v === (n.value ? n.value + unit.value : '')) return
    const p = parse(v)
    n.value = p.n
    unit.value = p.unit
  },
)

const push = () => emit('update:modelValue', n.value !== '' && Number(n.value) > 0 ? `${n.value}${unit.value}` : '')
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-slate-400" title="Hauteur maximale de l'image (vide = pas de limite)">
    <span class="whitespace-nowrap">Hauteur max</span>
    <input
      v-model="n"
      type="number"
      min="1"
      step="any"
      placeholder="auto"
      class="w-24 px-3 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400"
      @input="push"
    />
    <select
      v-model="unit"
      class="px-3 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-slate-100 focus:outline-none focus:border-indigo-400"
      @change="push"
    >
      <option v-for="u in UNITS" :key="u" :value="u">{{ u }}</option>
    </select>
  </div>
</template>
