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
  <div>
    <span class="ed-label">Hauteur max</span>
    <div class="flex items-center gap-2">
      <input v-model="n" type="number" min="1" step="any" placeholder="auto" class="ed-input !w-24" aria-label="Hauteur maximale" @input="push" />
      <select v-model="unit" class="ed-input !w-auto" aria-label="Unité" @change="push">
        <option v-for="u in UNITS" :key="u" :value="u">{{ u }}</option>
      </select>
    </div>
    <span class="ed-hint block">vide = pas de limite · vh = % de l'écran</span>
  </div>
</template>
