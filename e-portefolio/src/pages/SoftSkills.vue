<script setup>
import { ref } from 'vue'
import { atouts } from '@/content/remote'

const activeTab = ref(0)

// Largeur de la barre : nombre borné entre 0 et 100
const pct = (n) => Math.min(100, Math.max(0, Number(n) || 0))
const hasLevel = (it) => it.level !== undefined && it.level !== null && it.level !== ''
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
        <h1 class="text-5xl font-bold text-white mb-2">{{ atouts.title }}</h1>
        <p v-if="atouts.subtitle" class="text-indigo-300 text-lg">{{ atouts.subtitle }}</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-12">
        <!-- Onglets : un par catégorie -->
        <div class="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            v-for="(cat, ci) in atouts.categories"
            :key="ci"
            :class="activeTab === ci ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'"
            class="px-8 py-3 font-bold rounded-full transition-all duration-300"
            @click="activeTab = ci"
          >
            {{ cat.label }}
          </button>
        </div>

        <template v-for="(cat, ci) in atouts.categories" :key="ci">
          <section v-if="activeTab === ci" class="mb-20">
            <h2 v-if="cat.heading" class="text-3xl font-bold text-white mb-12 text-center">{{ cat.heading }}</h2>

            <!-- Mise en page « langues » -->
            <div v-if="cat.layout === 'languages'" class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div v-for="(it, i) in cat.items" :key="i" class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
                <div class="flex items-center gap-4 mb-6">
                  <span class="text-5xl">{{ it.icon }}</span>
                  <h3 class="text-3xl font-bold text-indigo-200">{{ it.title }}</h3>
                </div>
                <p v-if="it.tagline" class="text-slate-300 mb-4 text-lg">{{ it.tagline }}</p>
                <p v-if="it.detail" class="text-slate-400 text-sm mb-4">{{ it.detail }}</p>
                <div v-if="hasLevel(it)" class="w-full bg-slate-700 rounded-full h-4">
                  <div class="bg-indigo-500 h-4 rounded-full" :style="{ width: pct(it.level) + '%' }"></div>
                </div>
                <p v-if="it.levelLabel" class="text-indigo-400 text-sm mt-3 font-semibold">Niveau : {{ it.levelLabel }}</p>
              </div>
            </div>

            <!-- Mise en page « cartes avec barre de niveau » -->
            <div v-else class="grid md:grid-cols-2 gap-8">
              <div v-for="(it, i) in cat.items" :key="i" class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
                <div class="flex items-start gap-4 mb-4">
                  <div class="text-4xl">{{ it.icon }}</div>
                  <h3 class="text-2xl font-bold text-indigo-200">{{ it.title }}</h3>
                </div>
                <p v-if="it.description" class="text-slate-300 mb-4">{{ it.description }}</p>
                <div v-if="hasLevel(it)" class="w-full bg-slate-700 rounded-full h-3">
                  <div class="bg-indigo-500 h-3 rounded-full" :style="{ width: pct(it.level) + '%' }"></div>
                </div>
                <p v-if="hasLevel(it)" class="text-indigo-400 text-sm mt-2">Niveau : {{ it.levelLabel ? it.levelLabel + ' (' + pct(it.level) + '%)' : pct(it.level) + '%' }}</p>
              </div>
            </div>
          </section>
        </template>

        <!-- CTA Section -->
        <section class="text-center py-12">
          <h2 class="text-3xl font-bold text-white mb-8">Intéressé par mon profil ?</h2>
          <div class="flex gap-4 justify-center flex-wrap">
            <router-link to="/" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
              Me Contacter
            </router-link>
            <router-link to="/experiences" class="px-8 py-3 border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-all duration-300">
              Voir mes expériences
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
