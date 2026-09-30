<script setup>
import { loisirs } from '@/content/remote'

const SHADES = {
  '500': 'from-indigo-500 to-indigo-600 hover:shadow-indigo-500/50',
  '600': 'from-indigo-600 to-indigo-700 hover:shadow-indigo-600/50',
}
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
        <h1 class="text-5xl font-bold text-white mb-2">{{ loisirs.title }}</h1>
        <p v-if="loisirs.subtitle" class="text-indigo-300 text-lg">{{ loisirs.subtitle }}</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-20">
        <!-- Section Loisirs avec bulles -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          <div v-for="(it, i) in loisirs.items" :key="i" class="group">
            <div
              :class="SHADES[it.shade] || SHADES['500']"
              class="bg-gradient-to-br rounded-3xl h-64 flex items-center justify-center mb-6 shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div class="text-center">
                <div class="text-6xl mb-4">{{ it.icon }}</div>
                <p class="text-white font-bold text-xl">{{ it.label }}</p>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">{{ it.title }}</h3>
            <p class="text-slate-300">{{ it.description }}</p>
          </div>
        </div>

        <!-- Section Impact sur ma carrière -->
        <section v-if="loisirs.impacts && loisirs.impacts.length" class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 mb-20">
          <h2 class="text-3xl font-bold text-white mb-8 text-center">{{ loisirs.impactTitle }}</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div v-for="(im, i) in loisirs.impacts" :key="i" class="bg-slate-800/50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-indigo-300 mb-4">{{ im.title }}</h3>
              <p class="text-slate-300">{{ im.text }}</p>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="text-center py-20">
          <h2 class="text-3xl font-bold text-white mb-8">Discutons de vos projets !</h2>
          <div class="flex gap-4 justify-center flex-wrap">
            <router-link to="/competences" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
              Voir mes compétences
            </router-link>
            <router-link to="/" class="px-8 py-3 border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-all duration-300">
              Me Contacter
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
