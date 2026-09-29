<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { findProject, remoteLoaded } from '@/content/remote'
import PageRenderer from '@/components/PageRenderer.vue'

const route = useRoute()
const project = computed(() => findProject(route.params.slug))
</script>

<template>
  <PageRenderer v-if="project" :project="project" />

  <div v-else class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div v-if="!remoteLoaded" class="max-w-5xl mx-auto px-6 py-24 text-center text-slate-300">Chargement…</div>
    <div v-else class="max-w-5xl mx-auto px-6 py-24 text-center">
      <h1 class="text-4xl font-bold text-white mb-4">Projet introuvable</h1>
      <router-link to="/projects" class="text-indigo-300 hover:text-indigo-200">← Retour aux projets</router-link>
    </div>
  </div>
</template>
