<script setup>
import { ref } from 'vue'

const activeTab = ref('outils')

const setTab = (tab) => {
  activeTab.value = tab
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
        <h1 class="text-5xl font-bold text-white mb-2">Mes atouts</h1>
        <p class="text-indigo-300 text-lg">Consultez ci-dessous mes atouts techniques, mon niveau en langues étrangères, ainsi que mes soft-skills</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-12">
        <!-- Tabs Navigation -->
        <div class="flex justify-center gap-4 mb-12 flex-wrap">
          <button 
            @click="setTab('outils')" 
            :class="activeTab === 'outils' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'"
            class="px-8 py-3 font-bold rounded-full transition-all duration-300"
          >
            Outils numériques
          </button>
          <button 
            @click="setTab('langues')" 
            :class="activeTab === 'langues' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'"
            class="px-8 py-3 font-bold rounded-full transition-all duration-300"
          >
            Langues étrangères
          </button>
          <button 
            @click="setTab('softskills')" 
            :class="activeTab === 'softskills' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'"
            class="px-8 py-3 font-bold rounded-full transition-all duration-300"
          >
            Soft skills
          </button>
        </div>

        <!-- Tab Content: Outils numériques -->
        <section v-if="activeTab === 'outils'" class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">Outils Numériques & Technologies</h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Visual Studio / IDEs -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">💻</div>
                <h3 class="text-2xl font-bold text-indigo-200">Visual Studio / IDEs</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Maîtrise avancée de Visual Studio pour le développement C#/.NET, WPF. Utilisation de VS Code pour le développement web (Vue.js, JavaScript).
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 90%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Avancé (90%)</p>
            </div>

            <!-- Git / GitHub -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🔀</div>
                <h3 class="text-2xl font-bold text-indigo-200">Git / GitHub</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Gestion de versions avec Git, collaboration sur GitHub, création de branches, pull requests, résolution de conflits. Workflow d'équipe maîtrisé.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 85%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Avancé (85%)</p>
            </div>

            <!-- Bases de données -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🗄️</div>
                <h3 class="text-2xl font-bold text-indigo-200">Bases de Données</h3>
              </div>
              <p class="text-slate-300 mb-4">
                SQL Server, PostgreSQL, MySQL, DB2. Maîtrise des requêtes SQL, Entity Framework, ADO.NET. Conception de modèles relationnels normalisés.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 88%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Avancé (88%)</p>
            </div>

            <!-- Unity / Blender -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🎮</div>
                <h3 class="text-2xl font-bold text-indigo-200">Unity / Blender</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Développement de jeux 2D/3D avec Unity (C#). Création de modèles 3D avec Blender. Intégration d'assets, physique, animations.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 75%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Intermédiaire avancé (75%)</p>
            </div>

            <!-- VirtualBox / Systèmes -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🖥️</div>
                <h3 class="text-2xl font-bold text-indigo-200">VirtualBox / Administration</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Configuration de machines virtuelles, installation systèmes (Windows, Linux), configuration réseau, optimisation performances.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 80%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Avancé (80%)</p>
            </div>

            <!-- Frameworks Web -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🌐</div>
                <h3 class="text-2xl font-bold text-indigo-200">Vue.js / Frameworks Web</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Développement d'applications web avec Vue.js 3, Vue Router, Vite. Connaissances HTML5, CSS3, JavaScript moderne (ES6+).
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 82%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Avancé (82%)</p>
            </div>
          </div>
        </section>

        <!-- Tab Content: Langues -->
        <section v-if="activeTab === 'langues'" class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">Langues Étrangères</h2>
          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <!-- Français -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
              <div class="flex items-center gap-4 mb-6">
                <span class="text-5xl">🇫🇷</span>
                <h3 class="text-3xl font-bold text-indigo-200">Français</h3>
              </div>
              <p class="text-slate-300 mb-4 text-lg">Langue maternelle</p>
              <p class="text-slate-400 text-sm mb-4">Maîtrise complète à l'écrit et à l'oral</p>
              <div class="w-full bg-slate-700 rounded-full h-4">
                <div class="bg-indigo-500 h-4 rounded-full" style="width: 100%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-3 font-semibold">Niveau : Natif</p>
            </div>

            <!-- Anglais -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30">
              <div class="flex items-center gap-4 mb-6">
                <span class="text-5xl">🇬🇧</span>
                <h3 class="text-3xl font-bold text-indigo-200">Anglais</h3>
              </div>
              <p class="text-slate-300 mb-4 text-lg">Compréhension technique et professionnelle</p>
              <p class="text-slate-400 text-sm mb-4">Lecture de documentation technique, communication écrite</p>
              <div class="w-full bg-slate-700 rounded-full h-4">
                <div class="bg-indigo-500 h-4 rounded-full" style="width: 70%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-3 font-semibold">Niveau : Intermédiaire (B2)</p>
            </div>
          </div>
        </section>

        <!-- Tab Content: Soft Skills -->
        <section v-if="activeTab === 'softskills'" class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">Soft Skills & Qualités Comportementales</h2>
          
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Soft Skill 1 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🤝</div>
                <h3 class="text-2xl font-bold text-indigo-200">Travail d'Équipe</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Excellent collaborateur, capable de travailler efficacement en binôme ou en équipe. Partage des connaissances, écoute active et respect des idées diverses.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 90%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Très Avancé (90%)</p>
            </div>

            <!-- Soft Skill 2 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">💡</div>
                <h3 class="text-2xl font-bold text-indigo-200">Résolution de Problèmes</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Approche analytique et méthodique. Capacité à décomposer les problèmes complexes, identifier les causes racines et proposer des solutions efficaces.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 92%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Expert (92%)</p>
            </div>

            <!-- Soft Skill 3 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🚀</div>
                <h3 class="text-2xl font-bold text-indigo-200">Autonomie & Proactivité</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Autonome dans mes projets, capable de prendre des initiatives et de proposer des améliorations. Je n'hésite pas à chercher des solutions de manière proactive.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 88%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Très Avancé (88%)</p>
            </div>

            <!-- Soft Skill 4 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">⚙️</div>
                <h3 class="text-2xl font-bold text-indigo-200">Adaptabilité</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Très adaptable aux changements technologiques et organisationnels. Apprends rapidement de nouveaux langages, frameworks et méthodologies de travail.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 91%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Très Avancé (91%)</p>
            </div>

            <!-- Soft Skill 5 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🎯</div>
                <h3 class="text-2xl font-bold text-indigo-200">Rigueur & Organisation</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Très organisé et rigoureux. Respect des délais, documentation claire, suivi des bonnes pratiques de développement et conventions de code.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 87%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Avancé (87%)</p>
            </div>

            <!-- Soft Skill 6 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">💬</div>
                <h3 class="text-2xl font-bold text-indigo-200">Communication</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Bonne capacité de communication, tant à l'écrit qu'à l'oral. Capable d'expliquer des concepts techniques de manière claire et accessible.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 83%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Avancé (83%)</p>
            </div>

            <!-- Soft Skill 7 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🌱</div>
                <h3 class="text-2xl font-bold text-indigo-200">Curiosité & Apprentissage</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Passionné par l'apprentissage continu. Toujours curieux de découvrir de nouvelles technologies, méthodes et bonnes pratiques du développement.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 94%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Expert (94%)</p>
            </div>

            <!-- Soft Skill 8 -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300">
              <div class="flex items-start gap-4 mb-4">
                <div class="text-4xl">🤲</div>
                <h3 class="text-2xl font-bold text-indigo-200">Fiabilité & Engagement</h3>
              </div>
              <p class="text-slate-300 mb-4">
                Fiable et engagé dans mes projets. Je prends mes responsabilités au sérieux et m'assure de la qualité et du respect des engagements pris.
              </p>
              <div class="w-full bg-slate-700 rounded-full h-3">
                <div class="bg-indigo-500 h-3 rounded-full" style="width: 89%"></div>
              </div>
              <p class="text-indigo-400 text-sm mt-2">Niveau : Très Avancé (89%)</p>
            </div>
          </div>
        </section>

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
