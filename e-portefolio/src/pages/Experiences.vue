<script setup>
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
        <h1 class="text-5xl font-bold text-white mb-2">Mes Expériences Professionnelles</h1>
        <p class="text-indigo-300 text-lg">Parcours professionnel et stages</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-20">
        <!-- Alternance actuelle -->
        <div class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🧑‍💻
                </div>
              </div>
              <div class="flex-grow">
                <h3 class="text-2xl font-bold text-indigo-200 mb-2">Alternant — Reprise & Amélioration</h3>
                <p class="text-indigo-400 font-semibold mb-2">Savoy International — Cluses</p>
                <p class="text-slate-400 text-sm mb-4">📅 Période : 01 Septembre 2025 - Présent</p>
                <p class="text-slate-300 mb-4">
                  Mission : reprendre l'application développée lors du stage, améliorer et optimiser le code et l'architecture, et assurer la pérennité du support (maintenance, corrections, optimisation des performances et évolutions fonctionnelles).
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Maintenance</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Optimisation</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">C# / Vue.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ajout : Savoy International (Stage) -->
        <div class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🔧
                </div>
              </div>
              <div class="flex-grow">
                <h3 class="text-2xl font-bold text-indigo-200 mb-2">Stage - Refonte Applicative</h3>
                <p class="text-indigo-400 font-semibold mb-2">Savoy International — Cluses</p>
                <p class="text-slate-400 text-sm mb-4">📅 Période : 14 Avril 2025 - 04 Juillet 2025 (3 mois)</p>
                <p class="text-slate-300 mb-4">
                  Mission : Refonte de l'application "Sidesktop" (reporting & proactive) — migration d'une application Java vers une API REST en C# et développement d'une interface web en Vue.js. Travaux : conception API, implementation endpoints, migration des flux de données et réalisation d'une interface réactive.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">C#</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">API REST</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Vue.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ajout : Adecco-Savoie Moulage -->
        <div class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🏭
                </div>
              </div>
              <div class="flex-grow">
                <h3 class="text-2xl font-bold text-indigo-200 mb-2">Opérateur-Conditionneur</h3>
                <p class="text-indigo-400 font-semibold mb-2">Adecco - Savoie Moulage — Cluses</p>
                <p class="text-slate-400 text-sm mb-4">📅 Périodes : Juin 2023 - Août 2023 (3 mois) · Juillet 2024 - Août 2024 (2 mois)</p>
                <p class="text-slate-300 mb-4">
                  Missions : Mise en place d'insert dans une presse à injection plastique ; conditionnement et contrôle visuel de petites pièces. Travail en chaîne, respect des consignes qualité et sécurité.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Production</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Conditionnement</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Qualité</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ajout : Au coin du four -->
        <div class="mb-12">
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
            <div class="flex items-start gap-6">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  🥐
                </div>
              </div>
              <div class="flex-grow">
                <h3 class="text-2xl font-bold text-indigo-200 mb-2">Vendeur en boulangerie</h3>
                <p class="text-indigo-400 font-semibold mb-2">Au coin du four — Cluses</p>
                <p class="text-slate-400 text-sm mb-4">📅 Période : Juillet 2022 - Septembre 2022</p>
                <p class="text-slate-300 mb-4">
                  Missions : Vente et conseil des produits en boutique ; participation à la cuisson et à la mise en rayon. Relation client, gestion de caisse et respect des règles d'hygiène.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Relation client</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Production</span>
                  <span class="px-3 py-1 bg-indigo-500/30 text-indigo-300 rounded-full text-sm">Hygiène</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <!-- Timeline section -->
        <h2 class="text-3xl font-bold text-white mt-20 mb-12 text-center">Parcours Chronologique</h2>
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 to-slate-700"></div>
          
          <div class="space-y-12">
            <!-- Timeline: Alternance -->
            <div class="relative">
              <div class="ml-1/2 md:ml-0">
                <div class="flex justify-end md:justify-start gap-6 md:gap-0">
                  <div class="md:w-1/2 md:text-right md:pr-12">
                    <div class="bg-indigo-500/20 rounded-2xl p-4 border border-indigo-500/30">
                      <p class="text-indigo-300 font-bold">01 Septembre 2025 - Présent</p>
                      <p class="text-white font-semibold">Alternant — Reprise & Amélioration</p>
                      <p class="text-slate-400 text-sm">Savoy International (Cluses)</p>
                    </div>
                  </div>
                  <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-slate-900"></div>
                </div>
              </div>
            </div>

            <!-- Timeline: Stage Savoy 2025 -->
            <div class="relative">
              <div class="ml-1/2 md:ml-0">
                <div class="flex justify-start md:justify-end gap-6 md:gap-0">
                  <div class="md:w-1/2 md:text-left md:pl-12">
                    <div class="bg-indigo-500/20 rounded-2xl p-4 border border-indigo-500/30">
                      <p class="text-indigo-300 font-bold">14 Avril 2025 - 04 Juillet 2025</p>
                      <p class="text-white font-semibold">Stage - Refonte Applicative</p>
                      <p class="text-slate-400 text-sm">Savoy International (Cluses)</p>
                    </div>
                  </div>
                  <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-slate-900"></div>
                </div>
              </div>
            </div>

            <!-- Timeline: Adecco 2024 -->
            <div class="relative">
              <div class="ml-1/2 md:ml-0">
                <div class="flex justify-end md:justify-start gap-6 md:gap-0">
                  <div class="md:w-1/2 md:text-right md:pr-12">
                    <div class="bg-indigo-500/20 rounded-2xl p-4 border border-indigo-500/30">
                      <p class="text-indigo-300 font-bold">Juillet 2024 - Août 2024</p>
                      <p class="text-white font-semibold">Opérateur-Conditionneur</p>
                      <p class="text-slate-400 text-sm">Adecco - Savoie Moulage (Cluses)</p>
                    </div>
                  </div>
                  <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-slate-900"></div>
                </div>
              </div>
            </div>

            <!-- Timeline: Adecco 2023 -->
            <div class="relative">
              <div class="ml-1/2 md:ml-0">
                <div class="flex justify-start md:justify-end gap-6 md:gap-0">
                  <div class="md:w-1/2 md:text-left md:pl-12">
                    <div class="bg-indigo-500/20 rounded-2xl p-4 border border-indigo-500/30">
                      <p class="text-indigo-300 font-bold">Juin 2023 - Août 2023</p>
                      <p class="text-white font-semibold">Opérateur-Conditionneur</p>
                      <p class="text-slate-400 text-sm">Adecco - Savoie Moulage (Cluses)</p>
                    </div>
                  </div>
                  <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-slate-900"></div>
                </div>
              </div>
            </div>

            <!-- Timeline: Au coin du four -->
            <div class="relative">
              <div class="ml-1/2 md:ml-0">
                <div class="flex justify-end md:justify-start gap-6 md:gap-0">
                  <div class="md:w-1/2 md:text-right md:pr-12">
                    <div class="bg-indigo-500/20 rounded-2xl p-4 border border-indigo-500/30">
                      <p class="text-indigo-300 font-bold">Juillet 2022 - Septembre 2022</p>
                      <p class="text-white font-semibold">Vendeur en boulangerie</p>
                      <p class="text-slate-400 text-sm">Au coin du four (Cluses)</p>
                    </div>
                  </div>
                  <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-slate-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
