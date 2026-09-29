<script setup>
import { rich } from '@/content/richtext'
import { bulletOf } from '@/content/tones'

defineProps({
  card: { type: Object, required: true },
  variant: { type: String, default: 'plain' }, // 'plain' | 'gradient'
})
</script>

<template>
  <div
    :class="
      variant === 'gradient'
        ? 'bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all'
        : 'bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20'
    "
  >
    <div v-if="card.icon && card.iconPosition === 'top'" class="text-4xl mb-3 text-center">{{ card.icon }}</div>
    <h4 v-if="card.icon && card.iconPosition === 'top'" class="text-indigo-300 font-bold text-lg text-center mb-3">{{ card.title }}</h4>
    <div v-else-if="card.icon" class="flex items-center gap-3 mb-4">
      <span :class="card.iconSize === '2xl' ? 'text-2xl' : 'text-3xl'">{{ card.icon }}</span>
      <h4 class="text-indigo-300 font-bold text-lg">{{ card.title }}</h4>
    </div>
    <h3 v-else-if="card.title" class="text-indigo-300 font-bold text-lg mb-3">{{ card.title }}</h3>

    <p v-if="card.subtitle" class="text-slate-300 text-sm mb-4 font-semibold">{{ card.subtitle }}</p>
    <p v-if="card.text" :class="card.size === 'sm' ? 'text-sm' : ''" class="text-slate-300" v-html="rich(card.text, 'text-indigo-300')"></p>
    <ul v-if="card.items && card.items.length" :class="card.size === 'sm' ? 'space-y-2 text-sm' : 'space-y-3'" class="text-slate-300">
      <li v-for="(it, i) in card.items" :key="i" class="flex items-start gap-3">
        <span v-if="bulletOf(card)" class="text-indigo-400 flex-shrink-0">{{ bulletOf(card) }}</span>
        <span v-html="rich(it)"></span>
      </li>
    </ul>
    <template v-for="(g, gi) in card.extra" :key="gi">
      <p v-if="g.subtitle" class="text-slate-300 text-sm mb-4 mt-4 font-semibold">{{ g.subtitle }}</p>
      <ul v-if="g.items && g.items.length" :class="card.size === 'sm' ? 'space-y-2 text-sm' : 'space-y-3'" class="text-slate-300">
        <li v-for="(it, i) in g.items" :key="i" class="flex items-start gap-3">
          <span v-if="bulletOf(card)" class="text-indigo-400 flex-shrink-0">{{ bulletOf(card) }}</span>
          <span v-html="rich(it)"></span>
        </li>
      </ul>
    </template>
  </div>
</template>
