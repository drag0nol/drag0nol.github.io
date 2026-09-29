<script setup>
// Carrousel : défilement tactile (scroll-snap), flèches, points, lecture automatique facultative.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { rich } from '@/content/richtext'
import { tone, bulletOf } from '@/content/tones'
import CardView from './CardView.vue'
import ImageView from './ImageView.vue'

const props = defineProps({
  block: { type: Object, required: true },
  alt: { type: String, default: '' },
})

const perView = computed(() => Math.min(3, Math.max(1, Number(props.block.perView) || 1)))
const WIDTHS = {
  1: 'w-full',
  2: 'w-full md:w-[calc((100%_-_1.5rem)/2)]',
  3: 'w-full md:w-[calc((100%_-_3rem)/3)]',
}

const track = ref(null)
const current = ref(0)
const slides = computed(() => props.block.slides || [])

const stepWidth = () => {
  const first = track.value?.children[0]
  return first ? first.getBoundingClientRect().width + 24 : 0 // 24px = gap-6
}
function onScroll() {
  const w = stepWidth()
  current.value = w ? Math.round(track.value.scrollLeft / w) : 0
}
function goTo(i) {
  const max = Math.max(0, slides.value.length - 1)
  track.value?.scrollTo({ left: Math.min(max, Math.max(0, i)) * stepWidth(), behavior: 'smooth' })
}
const atEnd = () => {
  const t = track.value
  return t.scrollLeft + t.clientWidth >= t.scrollWidth - 4
}
function next() {
  if (atEnd()) goTo(0)
  else goTo(current.value + 1)
}
const prev = () => goTo(current.value - 1)

let timer = null
const start = () => {
  stop()
  const s = Number(props.block.autoplay) || 0
  if (s > 0 && slides.value.length > perView.value) timer = setInterval(next, s * 1000)
}
const stop = () => timer && (clearInterval(timer), (timer = null))
onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div v-if="slides.length" class="relative" @mouseenter="stop" @mouseleave="start" @focusin="stop" @focusout="start">
    <div ref="track" class="carousel-track flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth" @scroll.passive="onScroll">
      <div v-for="(s, i) in slides" :key="i" :class="WIDTHS[perView]" class="snap-start shrink-0">
        <!-- Image -->
        <ImageView v-if="s.type === 'image'" :img="s" :alt="alt" :compact="perView > 1" />

        <!-- Carte -->
        <CardView v-else-if="s.type === 'card'" :card="s" :variant="block.cardStyle || 'plain'" class="h-full" />

        <!-- Texte -->
        <div v-else-if="s.type === 'text'" :class="tone(s.tone).box" class="bg-gradient-to-r rounded-2xl border p-6 h-full">
          <h3 v-if="s.title" :class="tone(s.tone).title" class="text-lg font-bold mb-3">{{ s.title }}</h3>
          <p v-for="(p, pi) in s.paragraphs" :key="pi" class="text-slate-300 mb-3 last:mb-0" v-html="rich(p, tone(s.tone).bold)"></p>
          <ul v-if="s.items && s.items.length" class="text-slate-300 space-y-2 mt-3">
            <li v-for="(it, ii) in s.items" :key="ii" class="flex items-start gap-3">
              <span v-if="bulletOf({ bullet: s.bullet || 'arrow' })" class="text-indigo-400 flex-shrink-0">{{ bulletOf({ bullet: s.bullet || 'arrow' }) }}</span>
              <span v-html="rich(it, tone(s.tone).bold)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <template v-if="slides.length > perView">
      <button
        type="button"
        aria-label="Précédent"
        class="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-slate-900/80 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors"
        @click="prev"
      >‹</button>
      <button
        type="button"
        aria-label="Suivant"
        class="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-slate-900/80 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors"
        @click="next"
      >›</button>

      <div class="flex justify-center gap-2 mt-4">
        <button
          v-for="(_, i) in slides"
          :key="i"
          type="button"
          :aria-label="'Aller à la diapositive ' + (i + 1)"
          :class="i === current ? 'bg-indigo-400 w-6' : 'bg-slate-600 hover:bg-slate-500 w-2.5'"
          class="h-2.5 rounded-full transition-all"
          @click="goTo(i)"
        ></button>
      </div>
    </template>
  </div>
</template>
