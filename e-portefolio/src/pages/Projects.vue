<script setup>
import { allProjects as projects } from '@/content/remote'

const TONES = {
  indigo: {
    card: 'from-indigo-500/20 border-indigo-500/30 hover:border-indigo-400/50',
    category: 'text-indigo-300/70',
    tag: 'bg-indigo-500/30 text-indigo-200',
    button: 'bg-indigo-600 hover:bg-indigo-700',
  },
  amber: {
    card: 'from-amber-500/20 border-amber-500/30 hover:border-amber-400/50',
    category: 'text-amber-300/70',
    tag: 'bg-amber-500/30 text-amber-200',
    button: 'bg-amber-600 hover:bg-amber-700',
  },
}
const tone = (p) => TONES[p.tone] || TONES.indigo
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <!-- Bulles décoratives en arrière-plan -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <!-- Contenu principal -->
    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-5xl mx-auto px-6">
        <h1 class="text-5xl font-bold text-white mb-4">Mes projets</h1>
        <p class="text-indigo-300 text-lg mb-6">Cette page regroupe mes réalisations majeures : chaque carte ouvre une page détaillée avec contexte, stack, apports et compétences UE mobilisées.</p>

        <div class="flex flex-wrap gap-3 text-sm text-indigo-100">
          <span class="px-3 py-2 bg-indigo-500/30 rounded-full border border-indigo-400/30">Jeux / SAE</span>
          <span class="px-3 py-2 bg-indigo-500/30 rounded-full border border-indigo-400/30">Projet / TP</span>
          <span class="px-3 py-2 bg-indigo-500/30 rounded-full border border-indigo-400/30">Stage BUT2</span>
          <span class="px-3 py-2 bg-indigo-500/30 rounded-full border border-indigo-400/30">Alternance BUT3</span>
        </div>
      </header>

      <main class="max-w-5xl mx-auto px-6 py-16">
        <section class="mb-12">
          <p class="text-indigo-300 text-lg">Choisis un projet pour accéder à la présentation complète, aux livrables et aux apprentissages critiques associés.</p>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            v-for="p in projects"
            :key="p.slug"
            :class="tone(p).card"
            class="bg-gradient-to-r to-slate-700/20 rounded-2xl p-6 border transition-all relative"
          >
            <div v-if="p.status" class="absolute top-3 right-3 px-2 py-1 bg-amber-500/30 text-amber-200 text-xs font-bold rounded">{{ p.status }}</div>
            <p :class="tone(p).category" class="text-sm uppercase tracking-[0.2em] mb-2">{{ p.category }}</p>
            <h2 class="text-2xl font-bold text-white mb-2">{{ p.title }}</h2>
            <p class="text-slate-300 mb-4">{{ p.summary }}</p>
            <div class="flex flex-wrap gap-2 mb-4 text-sm">
              <span v-for="t in p.tags" :key="t" :class="tone(p).tag" class="px-3 py-1 rounded-full">{{ t }}</span>
            </div>
            <router-link
              :to="'/projects/' + p.slug"
              :class="tone(p).button"
              class="inline-flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg transition-colors"
            >
              Voir la page
              <span>→</span>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
