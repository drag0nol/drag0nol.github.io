<script setup>
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
        <section class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
            <h2 class="text-2xl font-bold text-indigo-200 mb-4">🎓 Baccalauréat</h2>
            <p class="text-slate-300 mb-2">Obtention du baccalauréat en 2023</p>
            <p class="text-slate-400 mb-4">Lycée Charles Poncet — Cluses</p>
            <div class="flex gap-2 flex-wrap">
              <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Année : 2023</span>
              <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Spécialité : Mathématiques</span>
              <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Spécialité : Numérique et Sciences Informatiques (NSI)</span>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
            <h2 class="text-2xl font-bold text-indigo-200 mb-4">🏫 BUT Informatique</h2>
            <p class="text-slate-300 mb-2">IUT d'Annecy — BUT Informatique</p>
            <p class="text-slate-400 mb-4">2023 — Présent (Parcours : Réalisation d'applications)</p>
            <p class="text-slate-300 mb-4">Modules clés : architecture logicielle, développement web, bases de données, sécurité, gestion de projet.</p>
            <div class="flex gap-2 flex-wrap">
              <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">IUT Annecy</span>
                <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">BUT Informatique</span>
              <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">2023 - Aujourd'hui</span>
                <a class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm" href="https://iut.univ-smb.fr" target="_blank" rel="noopener">Site IUT Annecy</a>
              <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Parcours : Réalisation d'applications</span>
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