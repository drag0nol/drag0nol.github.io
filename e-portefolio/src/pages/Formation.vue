<script setup>
import { allFormations as formations } from '@/content/remote'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <!-- Bulles décoratives -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-6xl mx-auto px-6">
        <h1 class="text-4xl font-bold text-white mb-2">Ma formation</h1>
        <p class="text-indigo-300 text-lg">Parcours scolaire et études supérieures</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-12">
        <section v-for="f in formations" :key="f.title + f.period" class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
            <h2 class="text-2xl font-bold text-indigo-200 mb-4">{{ f.icon }} {{ f.title }}</h2>
            <p v-if="f.subtitle" class="text-slate-300 mb-2">{{ f.subtitle }}</p>
            <p v-if="f.period" class="text-slate-400 mb-4">{{ f.period }}</p>
            <p v-if="f.text" class="text-slate-300 mb-4">{{ f.text }}</p>
            <div v-if="f.tags && f.tags.length" class="flex gap-2 flex-wrap">
              <template v-for="t in f.tags" :key="t.label">
                <a v-if="t.url" :href="t.url" target="_blank" rel="noopener" class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">{{ t.label }}</a>
                <span v-else class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">{{ t.label }}</span>
              </template>
            </div>
          </div>
        </section>
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
</style>
