<script setup>
import { computed } from 'vue'
import { experiences } from '@/content/remote'

// Lieu affiché dans la frise : « Entreprise — Ville » devient « Entreprise (Ville) ».
const placeOf = (company) => (company || '').replace(/ — (.*)$/, ' ($1)')

// Une entrée de frise par période ; à défaut de « timeline », la période de la carte est utilisée.
const timeline = computed(() =>
  (experiences.value.items || []).flatMap((it) =>
    (it.timeline && it.timeline.length ? it.timeline : [{ period: it.period }]).map((t) => ({
      period: t.period,
      title: it.title,
      place: placeOf(it.company),
    })),
  ),
)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <!-- Bulles décoratives en arrière-plan -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <!-- Contenu principal -->
    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-6xl mx-auto px-6">
        <h1 class="text-5xl font-bold text-white mb-2">{{ experiences.title }}</h1>
        <p v-if="experiences.subtitle" class="text-indigo-300 text-lg">{{ experiences.subtitle }}</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-20">
        <!-- Cartes d'expérience -->
        <div v-for="(it, i) in experiences.items" :key="i" class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div
                  :class="i % 2 ? 'from-indigo-600 to-indigo-700' : 'from-indigo-500 to-indigo-600'"
                  class="w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center text-2xl shadow-lg"
                >
                  {{ it.icon }}
                </div>
              </div>
              <div class="flex-grow">
                <h3 class="text-2xl font-bold text-indigo-200 mb-2">{{ it.title }}</h3>
                <p v-if="it.company" class="text-indigo-400 font-semibold mb-2">{{ it.company }}</p>
                <p v-if="it.period" class="text-slate-400 text-sm mb-4">📅 {{ it.periodLabel || 'Période' }} : {{ it.period }}</p>
                <p v-if="it.description" class="text-slate-300 mb-4">{{ it.description }}</p>
                <div v-if="it.tags && it.tags.length" class="flex flex-wrap gap-2">
                  <span v-for="t in it.tags" :key="t" class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline section -->
        <template v-if="timeline.length">
          <h2 class="text-3xl font-bold text-white mt-20 mb-12 text-center">{{ experiences.timelineTitle || 'Parcours Chronologique' }}</h2>
          <div class="relative">
            <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-slate-700"></div>

            <div class="space-y-12">
              <div v-for="(t, i) in timeline" :key="i" class="relative">
                <div class="ml-1/2 md:ml-0">
                  <div :class="i % 2 ? 'justify-start md:justify-end' : 'justify-end md:justify-start'" class="flex gap-6 md:gap-0">
                    <div :class="i % 2 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'" class="md:w-1/2">
                      <div class="bg-indigo-500/20 rounded-2xl p-4 border border-indigo-500/30">
                        <p class="text-indigo-300 font-bold">{{ t.period }}</p>
                        <p class="text-white font-semibold">{{ t.title }}</p>
                        <p class="text-slate-400 text-sm">{{ t.place }}</p>
                      </div>
                    </div>
                    <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-slate-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- CTA Section -->
        <section class="max-w-6xl mx-auto mt-20 py-20 text-center">
          <h2 class="text-3xl font-bold text-white mb-8">Intéressé par une collaboration ?</h2>
          <div class="flex gap-4 justify-center flex-wrap">
            <router-link to="/mes-atouts" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                Découvrir mes atouts
              </router-link>
            <router-link to="/" class="px-8 py-3 border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-all duration-300">
              Contactez-moi
            </router-link>
          </div>
        </section>
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
