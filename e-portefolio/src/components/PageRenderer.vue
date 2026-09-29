<script setup>
// Affiche une page de projet à partir de son modèle de données (voir src/content/index.js).
import { rich } from '@/content/richtext'
import { tone, bulletOf } from '@/content/tones'
import CardView from './CardView.vue'
import CarouselBlock from './CarouselBlock.vue'
import ImageView from './ImageView.vue'

defineProps({
  project: { type: Object, required: true },
  showBack: { type: Boolean, default: true }, // boutons « retour » (masqués dans l'aperçu de l'éditeur)
})

const COLUMNS = { 1: '', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' }
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <div class="relative z-10">
      <!-- En-tête -->
      <header class="pt-12 pb-8 max-w-5xl mx-auto px-6">
        <div v-if="showBack" class="mb-6">
          <router-link
          to="/projects"
          class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-200 hover:text-white font-semibold rounded-lg transition-colors"
        >
          <span>←</span><span>Retour aux projets</span>
        </router-link>
        </div>
        <p v-if="project.header.kicker" class="text-sm uppercase tracking-[0.2em] text-indigo-300/70">{{ project.header.kicker }}</p>
        <h1 :class="project.header.smallTitle ? 'text-4xl mb-3' : 'text-5xl mb-4'" class="font-bold text-white">{{ project.header.title }}</h1>
        <p v-if="project.header.subtitle" class="text-indigo-300 text-lg mb-6">{{ project.header.subtitle }}</p>

        <div
          v-if="project.header.notice"
          :class="tone(project.header.notice.tone || 'amber').box"
          class="bg-gradient-to-r rounded-2xl p-6 border mb-8"
        >
          <div class="flex items-center gap-3 mb-3">
            <span v-if="project.header.notice.icon" class="text-2xl">{{ project.header.notice.icon }}</span>
            <h2 :class="tone(project.header.notice.tone || 'amber').title" class="text-xl font-bold">{{ project.header.notice.title }}</h2>
          </div>
          <p class="text-slate-300 text-sm" v-html="rich(project.header.notice.text)"></p>
        </div>

        <div
          v-if="project.header.criteria && project.header.criteria.items.length"
          class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-6 border border-indigo-500/30 mb-8"
        >
          <h2 class="text-xl font-bold text-indigo-200 mb-3">{{ project.header.criteria.title }}</h2>
          <ul class="space-y-2 text-slate-300">
            <li v-for="(it, i) in project.header.criteria.items" :key="i">
              • <span class="text-indigo-300 font-semibold">{{ it.code }}</span> – {{ it.text }}
            </li>
          </ul>
        </div>

        <div
          v-if="project.header.facts && project.header.facts.length"
          :class="project.header.factsStyle === 'chips' ? 'gap-4 md:gap-6' : 'gap-6'"
          class="flex flex-wrap text-slate-300"
        >
          <template v-for="(f, i) in project.header.facts" :key="i">
            <span
              v-if="project.header.factsStyle === 'chips'"
              class="px-3 py-2 bg-slate-800/50 rounded-lg border border-indigo-500/20 flex items-center gap-2"
            >
              <span v-if="f.icon" class="text-lg">{{ f.icon }}</span>
              <span v-html="rich(f.text)"></span>
            </span>
            <div v-else class="flex items-center gap-2">
              <span v-if="f.icon" class="text-indigo-400 text-2xl">{{ f.icon }}</span>
              <span v-html="rich(f.text, 'text-indigo-300')"></span>
            </div>
          </template>
        </div>
      </header>

      <!-- Sections -->
      <main class="max-w-5xl mx-auto px-6 py-16">
        <section v-for="(s, si) in project.sections" :key="si" class="mb-16 last:mb-0">
          <h2 v-if="s.title" class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">{{ s.title }}</h2>

          <template v-for="(b, bi) in s.blocks" :key="bi">
            <!-- Sous-titre -->
            <h3 v-if="b.type === 'heading'" class="text-2xl font-bold text-indigo-200 mb-6">{{ b.text }}</h3>

            <!-- Encadré de texte -->
            <div
              v-else-if="b.type === 'callout'"
              :class="[tone(b.tone).box, b.size === 'sm' ? 'p-6' : 'p-8']"
              class="bg-gradient-to-r rounded-2xl border mb-8"
            >
              <h3 v-if="b.title" :class="tone(b.tone).title" class="text-lg font-bold mb-3">{{ b.title }}</h3>
              <p
                v-for="(p, i) in b.paragraphs"
                :key="i"
                :class="b.size === 'sm' ? 'mb-3' : 'text-lg leading-relaxed mb-4'"
                class="text-slate-300 last:mb-0"
                v-html="rich(p, tone(b.tone).bold)"
              ></p>
              <ul v-if="b.items && b.items.length" class="text-slate-300 space-y-2 mt-4">
                <li v-for="(it, i) in b.items" :key="i" class="flex items-start gap-3">
                  <span v-if="bulletOf(b)" class="text-indigo-400 flex-shrink-0">{{ bulletOf({ bullet: b.bullet || 'arrow' }) }}</span>
                  <span v-html="rich(it, tone(b.tone).bold)"></span>
                </li>
              </ul>
            </div>

            <!-- Grille de cartes -->
            <div
              v-else-if="b.type === 'cards'"
              :class="COLUMNS[b.columns] ?? COLUMNS[2]"
              class="grid grid-cols-1 gap-6 mb-8"
            >
              <CardView v-for="(c, ci) in b.cards" :key="ci" :card="c" :variant="b.style" />
            </div>

            <!-- Carrousel -->
            <div v-else-if="b.type === 'carousel'" class="mb-8">
              <CarouselBlock :block="b" :alt="project.title" />
            </div>

            <!-- Images -->
            <div
              v-else-if="b.type === 'image'"
              :class="b.images.length > 1 ? 'md:grid-cols-2' : ''"
              class="grid grid-cols-1 gap-6 mb-8"
            >
              <ImageView v-for="(img, i) in b.images" :key="i" :img="img" :alt="project.title" />
            </div>

            <!-- Bouton -->
            <div v-else-if="b.type === 'button'" class="mb-8">
              <a
                :href="b.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-lg"
              >
                <span v-if="b.icon">{{ b.icon }}</span><span>{{ b.label }}</span><span>→</span>
              </a>
            </div>
          </template>
        </section>

        <div v-if="showBack" class="mt-16">
          <router-link
          to="/projects"
          class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/60 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-200 hover:text-white font-semibold rounded-lg transition-colors"
        >
          <span>←</span><span>Retour aux projets</span>
        </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>
