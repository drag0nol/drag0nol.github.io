<script setup>
// Zone de texte <-> tableau de chaînes.
// mode "line" : une entrée par ligne ; "para" : paragraphes séparés par une ligne vide ; "comma" : séparées par des virgules.
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  mode: { type: String, default: 'line' },
  rows: { type: Number, default: 3 },
  placeholder: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const SEP = { line: '\n', para: '\n\n', comma: ', ' }
const parse = (t) =>
  (props.mode === 'para' ? t.split(/\n\s*\n/) : props.mode === 'comma' ? t.split(',') : t.split('\n'))
    .map((s) => s.trim())
    .filter(Boolean)

const text = ref((props.modelValue || []).join(SEP[props.mode]))

watch(
  () => props.modelValue,
  (v) => {
    if (JSON.stringify(v || []) !== JSON.stringify(parse(text.value))) text.value = (v || []).join(SEP[props.mode])
  },
)

function onInput(e) {
  text.value = e.target.value
  emit('update:modelValue', parse(text.value))
}
</script>

<template>
  <textarea
    :value="text"
    :rows="rows"
    :placeholder="placeholder"
    class="ed-input"
    @input="onInput"
  ></textarea>
</template>
