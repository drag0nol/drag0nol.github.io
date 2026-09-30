<script setup>
import { profile } from '@/content/remote'

const isExternal = (url) => /^https?:/.test(url)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <!-- Bulles décoratives en arrière-plan -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <!-- Contenu principal -->
    <div class="relative z-10">
      <!-- Section À propos (mis à jour) -->
      <section class="max-w-6xl mx-auto px-6 py-20 mb-20">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-white mb-6">À propos</h2>
            <p class="text-slate-300 text-lg mb-4">
              Je suis un étudiant en troisième année de BUT Informatique, parcours Réalisation d'applications : conception, développement et validation. Actuellement en alternance, je maîtrise Python pour réaliser des applications ou des jeux simples.
            </p>
            <p class="text-slate-300 text-lg mb-4">
              Je suis également capable d'utiliser C# pour produire des applications plus complexes et des jeux en 2D comme en 3D. Je recherche des opportunités pour appliquer et approfondir ces compétences en entreprise.
            </p>
            <p class="text-slate-300 text-lg">
              Découvrez mes <router-link to="/competences" class="text-indigo-400 hover:text-indigo-300 underline">compétences</router-link> et mes <router-link to="/experiences" class="text-indigo-400 hover:text-indigo-300 underline">expériences</router-link>.
            </p>
          </div>
          <div class="flex justify-center">
            <div class="w-64 h-64 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          </div>
        </div>
      </section>

      <!-- Section Profil & Contact -->
      <section class="max-w-6xl mx-auto px-6 mb-20">
        <h2 class="text-3xl font-bold text-white mb-12 text-center">Profil & Contact</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Carte Profil -->
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">{{ profile.infosTitle }}</h3>
            <div class="space-y-4 text-slate-300">
              <div v-for="(it, i) in profile.infos" :key="i" class="flex items-center gap-3">
                <span class="text-2xl">{{ it.icon }}</span>
                <div>
                  <p class="text-sm text-slate-400">{{ it.label }}</p>
                  <p class="font-semibold text-white">{{ it.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Carte Contact & Téléchargement -->
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">{{ profile.contactTitle }}</h3>
            <div class="space-y-4 text-slate-300">
              <component
                :is="c.url ? 'a' : 'div'"
                v-for="(c, i) in profile.contacts"
                :key="i"
                :href="c.url || undefined"
                :target="isExternal(c.url) ? '_blank' : undefined"
                :rel="isExternal(c.url) ? 'noopener noreferrer' : undefined"
                :class="c.url ? 'hover:text-indigo-300 transition-colors' : ''"
                class="flex items-center gap-3"
              >
                <span class="text-2xl">{{ c.icon }}</span>
                <div>
                  <p class="text-sm text-slate-400">{{ c.label }}</p>
                  <p class="font-semibold text-white break-all">{{ c.value }}</p>
                </div>
              </component>
            </div>

            <!-- Boutons CV -->
            <div v-if="profile.cv.url" class="mt-8 pt-6 border-t border-indigo-500/30 space-y-3">
              <a :href="profile.cv.url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors w-full justify-center">
                <span>👁️</span>
                <span>{{ profile.cv.previewLabel }}</span>
              </a>
              <a :href="profile.cv.url" download class="inline-flex items-center gap-3 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors w-full justify-center">
                <span>📄</span>
                <span>{{ profile.cv.downloadLabel }}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Compétences déplacées vers la page dédiée -->
      <section class="max-w-6xl mx-auto px-6 mb-20">
        <h2 class="text-3xl font-bold text-white mb-6 text-center">Compétences</h2>
        <p class="text-slate-300 text-center mb-6">Toutes mes compétences détaillées sont disponibles sur la page dédiée.</p>
        <div class="text-center">
          <router-link to="/competences" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">Voir mes Compétences</router-link>
        </div>
      </section>

      <!-- Section CTA -->
      <section class="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 class="text-3xl font-bold text-white mb-8">Prêt à collaborer ?</h2>
        <div class="flex gap-4 justify-center">
          <router-link to="/experiences" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
            Découvrir mes expériences
          </router-link>
          <a v-if="profile.cv.url" :href="profile.cv.url" download class="px-8 py-3 border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-all duration-300">
            {{ profile.cv.downloadLabel }}
          </a>
        </div>
      </section>
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
