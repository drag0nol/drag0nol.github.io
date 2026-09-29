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
        <h1 class="text-5xl font-bold text-white mb-2">Mes Loisirs & Passions</h1>
        <p class="text-indigo-300 text-lg">Ce qui me passionne en dehors du code</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-20">
        <!-- Section Loisirs avec bulles -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          <!-- Loisir 1 -->
          <div class="group">
            <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl h-64 flex items-center justify-center mb-6 shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
              <div class="text-center">
                <div class="text-6xl mb-4">🎮</div>
                <p class="text-white font-bold text-xl">Jeux Vidéo</p>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Jeux Vidéo & Gaming</h3>
            <p class="text-slate-300">
              Passionné par les jeux vidéo depuis longtemps. Je mets l'accent sur l'expérience de jeux : exploration d'univers, compétition, coopération en ligne et immersion. Le jeu est avant tout un loisir qui me permet de me détendre, d'analyser des mécaniques et d'apprendre des stratégies et des systèmes de gameplay.
            </p>
          </div>

          <!-- Loisir 2 -->
          <div class="group">
            <div class="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl h-64 flex items-center justify-center mb-6 shadow-2xl hover:shadow-indigo-600/50 transition-all duration-300 hover:scale-105">
              <div class="text-center">
                <div class="text-6xl mb-4">🏁</div>
                <p class="text-white font-bold text-xl">Sport Automobile</p>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Endurance & Championnats</h3>
            <p class="text-slate-300">
              Passionné par le sport automobile, en particulier l'endurance (WEC) et les championnats annexes. Je suis les courses, étudie les stratégies et je m'intéresse aussi aux aspects techniques et logistiques des écuries.
            </p>
          </div>

          <!-- Loisir 3 -->
          <div class="group">
            <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl h-64 flex items-center justify-center mb-6 shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
              <div class="text-center">
                <div class="text-6xl mb-4">🏉</div>
                <p class="text-white font-bold text-xl">Rugby</p>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Rugby & Esprit d'équipe</h3>
            <p class="text-slate-300">
              Passionné de rugby : j'apprécie l'esprit d'équipe, la stratégie collective et la préparation physique. Ce sport m'a appris le leadership et la résilience.
            </p>
          </div>

          <!-- Loisir 4 -->
          <div class="group">
            <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl h-64 flex items-center justify-center mb-6 shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
              <div class="text-center">
                <div class="text-6xl mb-4">🕹️</div>
                <p class="text-white font-bold text-xl">Réalisation de jeux / logiciels</p>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Création de jeux et logiciels</h3>
            <p class="text-slate-300">
              Conception et développement de jeux et petits logiciels en projets personnels : design de gameplay, architecture logicielle, programmation (moteurs et scripts), tests et déploiement. J'aime transformer une idée en prototype jouable et itérer jusqu'à une version aboutie.
            </p>
          </div>
        </div>

        <!-- Section Impact sur ma carrière -->
        <section class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-8 border border-indigo-500/30 mb-20">
          <h2 class="text-3xl font-bold text-white mb-8 text-center">Comment mes passions influencent mon travail</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-slate-800/50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-indigo-300 mb-4">🎨 Créativité & Design</h3>
                  <p class="text-slate-300">
                    Mon travail sur la réalisation de jeux et logiciels, ainsi que mon intérêt pour les univers visuels du gaming et du sport automobile, m'a développé une sensibilité au design et à l'expérience utilisateur.
                  </p>
            </div>
            <div class="bg-slate-800/50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-indigo-300 mb-4">⚡ Curiosité Technique</h3>
              <p class="text-slate-300">
                La réalisation de jeux et logiciels m'encourage à explorer constamment de nouvelles technologies, frameworks et outils pour améliorer mes projets.
              </p>
            </div>
            <div class="bg-slate-800/50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-indigo-300 mb-4">🧠 Pensée analytique</h3>
              <p class="text-slate-300">
                Le sport (rugby, endurance) m'a appris la discipline et la stratégie ; la création de jeux m'a formé à découper des problèmes complexes en tâches techniques réalisables.
              </p>
            </div>
            <div class="bg-slate-800/50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-indigo-300 mb-4">🌍 Approche holistique</h3>
              <p class="text-slate-300">
                Avoir des intérêts variés me permet d'avoir une vision globale, de mieux comprendre mes utilisateurs et de créer des solutions vraiment adaptées.
              </p>
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
