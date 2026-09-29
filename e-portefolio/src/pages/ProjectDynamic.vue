<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findProject, remoteLoaded } from '@/content/remote'

const route = useRoute()
const project = computed(() => findProject(route.params.slug))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

    <div v-if="!project && !remoteLoaded" class="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center text-slate-300">Chargement…</div>

    <div v-else-if="!project" class="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Projet introuvable</h1>
      <router-link to="/projects" class="text-indigo-300 hover:text-indigo-200">← Retour aux projets</router-link>
    </div>

    <div v-else class="relative z-10">
      <header class="pt-12 pb-8 max-w-5xl mx-auto px-6">
        <router-link to="/projects" class="text-indigo-300 hover:text-indigo-200 text-sm">← Tous les projets</router-link>
        <p class="text-sm uppercase tracking-[0.2em] text-indigo-300/70 mt-6">{{ project.category }}</p>
        <h1 class="text-5xl font-bold text-white mb-4">{{ project.title }}</h1>
        <p v-if="project.subtitle" class="text-indigo-300 text-lg mb-6">{{ project.subtitle }}</p>
        <div v-if="project.meta.length" class="flex flex-wrap gap-6 text-slate-300">
          <span v-for="m in project.meta" :key="m">{{ m }}</span>
        </div>
        <div v-if="project.tags.length" class="flex flex-wrap gap-2 mt-6 text-sm">
          <span v-for="t in project.tags" :key="t" class="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full">{{ t }}</span>
        </div>
      </header>

      <main class="max-w-5xl mx-auto px-6 py-12">
        <section v-for="(s, i) in project.sections" :key="i" class="mb-16">
          <h2 v-if="s.title" class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">{{ s.title }}</h2>
          <div v-if="s.text.length || s.bullets.length" class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
            <p v-for="(p, j) in s.text" :key="j" class="text-slate-300 text-lg leading-relaxed mb-4 last:mb-0">{{ p }}</p>
            <ul v-if="s.bullets.length" class="text-slate-300 space-y-2 mt-4">
              <li v-for="b in s.bullets" :key="b" class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>{{ b }}</span></li>
            </ul>
          </div>
          <div v-if="s.images.length" class="grid gap-6" :class="s.images.length > 1 ? 'md:grid-cols-2' : ''">
            <figure v-for="img in s.images" :key="img.file">
              <div class="bg-slate-800/50 rounded-lg border border-indigo-500/30 overflow-hidden shadow-lg">
                <img :src="img.src" :alt="img.caption || project.title" class="w-full h-auto object-cover" loading="lazy" />
              </div>
              <figcaption v-if="img.caption" class="text-slate-400 text-sm mt-2">{{ img.caption }}</figcaption>
            </figure>
          </div>
        </section>

        <section v-if="project.links.length" class="flex flex-wrap gap-3">
          <a v-for="l in project.links" :key="l.url" :href="l.url" target="_blank" rel="noopener"
             class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
            {{ l.label }} <span>→</span>
          </a>
        </section>
      </main>
    </div>
  </div>
</template>
