<script setup>
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-5xl mx-auto px-6">
        <p class="text-sm uppercase tracking-[0.2em] text-indigo-300/70">Projet étudiant — SAE</p>
        <h1 class="text-5xl font-bold text-white mb-4">StarBound Legacy</h1>
        <p class="text-indigo-300 text-lg mb-6">Jeu de tir spatial — WPF / C# — 2 semaines en binôme</p>

        <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-6 border border-indigo-500/30 mb-8">
          <h2 class="text-xl font-bold text-indigo-200 mb-3">Apprentissages Critiques</h2>
          <ul class="space-y-2 text-slate-300">
            <li>• <span class="text-indigo-300 font-semibold">AC11.01</span> – Implémenter des conceptions simples</li>
            <li>• <span class="text-indigo-300 font-semibold">AC11.04</span> – Développer des interfaces utilisateurs</li>
            <li>• <span class="text-indigo-300 font-semibold">AC12.01</span> – Analyser un problème avec méthode</li>
            <li>• <span class="text-indigo-300 font-semibold">AC12.02</span> – Comparer des algorithmes</li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-6 text-slate-300">
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🎓</span>
            <span><strong class="text-indigo-300">SAE</strong> — 1ère année BUT Informatique</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">👥</span>
            <span><strong class="text-indigo-300">Groupe de 2</strong> personnes</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">⏱️</span>
            <span><strong class="text-indigo-300">2 semaines</strong> de développement</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">💻</span>
            <span><strong class="text-indigo-300">WPF</strong> / <strong class="text-indigo-300">C#</strong></span>
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto px-6 py-16">
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 1 : Concept & Objectif</h2>
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
            <p class="text-slate-300 text-lg leading-relaxed mb-4">
              StarBound Legacy est un jeu de tir spatial arcade. Objectif : <strong class="text-indigo-300">éliminer tous les obstacles</strong> en évitant astéroïdes et ennemis à difficulté croissante.
            </p>
            <p class="text-slate-300 text-lg leading-relaxed">
              SAE appliquant conception, implémentation, tests et gestion des exigences fonctionnelles et non-fonctionnelles.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">🎯 Objectif Principal</h3>
              <p class="text-slate-300">Éliminer tous les obstacles devant le joueur</p>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">🕹️ Genre</h3>
              <p class="text-slate-300">Jeu de tir spatial arcade</p>
            </div>
          </div>

          <div class="mt-8">
            <p class="text-slate-400 text-sm mb-2">📸 Menu principal / Écran de démarrage</p>
            <div class="bg-slate-800/50 rounded-lg border border-indigo-500/30 overflow-hidden shadow-lg">
              <img src="@/assets/projects/starbound-legacy/menu-principal.png" alt="Menu principal StarBound Legacy" class="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 2 : Gameplay & Mécanique</h2>
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-8">
            <p class="text-slate-300 text-lg leading-relaxed mb-6">
              Le joueur <strong class="text-indigo-300">évite astéroïdes et ennemis</strong>, ce qui m'a fait travailler la <strong class="text-indigo-300">gestion des collisions</strong> et la <strong class="text-indigo-300">physique du jeu</strong>.
            </p>
            <p class="text-slate-300 text-lg leading-relaxed">
              Les astéroïdes sont <strong class="text-indigo-300">indestructibles</strong> aux projectiles standards, obligeant l'évitement et l'équilibrage.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">✈️ Contrôles du Joueur</h3>
              <ul class="text-slate-300 space-y-2">
                <li>• Mouvements (haut, bas, gauche, droite)</li>
                <li>• Tir projectiles standards</li>
                <li>• Utilisation des bonus du magasin</li>
              </ul>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">⚔️ Ennemis & Obstacles</h3>
              <ul class="text-slate-300 space-y-2">
                <li>• Ennemis destructibles</li>
                <li>• Astéroïdes indestructibles (évitement)</li>
                <li>• Difficulté progressive</li>
              </ul>
            </div>
          </div>

          <div>
            <p class="text-slate-400 text-sm mb-2">📸 Gameplay en action</p>
            <div class="bg-slate-800/50 rounded-lg border border-indigo-500/30 overflow-hidden shadow-lg">
              <img src="@/assets/projects/starbound-legacy/gameplay.png" alt="Gameplay StarBound Legacy" class="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 3 : Système de Magasin & Progression</h2>
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-8">
            <p class="text-slate-300 text-lg leading-relaxed mb-4">Monnaie = score → permet d'acheter des améliorations.</p>
            <p class="text-slate-300 text-lg leading-relaxed">Implémentation d'une <strong class="text-indigo-300">gestion des ressources</strong> et d'une <strong class="text-indigo-300">UI de magasin</strong>.</p>
          </div>

          <h3 class="text-2xl font-bold text-indigo-200 mb-6">🛒 Bonus Disponibles</h3>
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
              <div class="flex items-center gap-3 mb-4"><span class="text-3xl">🛡️</span><h4 class="text-indigo-300 font-bold text-lg">Bouclier</h4></div>
              <p class="text-slate-300">Invincibilité temporaire et points bonus.</p>
            </div>
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
              <div class="flex items-center gap-3 mb-4"><span class="text-3xl">❤️</span><h4 class="text-indigo-300 font-bold text-lg">Kit de Soins</h4></div>
              <p class="text-slate-300">Restaure la santé à 100%.</p>
            </div>
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
              <div class="flex items-center gap-3 mb-4"><span class="text-3xl">💣</span><h4 class="text-indigo-300 font-bold text-lg">Bombe Nucléaire</h4></div>
              <p class="text-slate-300">Nettoie l'écran (destruction massive).</p>
            </div>
          </div>

          <div>
            <p class="text-slate-400 text-sm mb-2">📸 Interface du Magasin</p>
            <div class="bg-slate-800/50 rounded-lg border border-indigo-500/30 overflow-hidden shadow-lg">
              <img src="@/assets/projects/starbound-legacy/shop.png" alt="Interface du magasin StarBound Legacy" class="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 4 : Architecture & Implémentation</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">✅ Réalisations Techniques</h3>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-start gap-3"><span class="text-indigo-400 flex-shrink-0">▸</span><span>Gestion complète des collisions et physique du jeu</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400 flex-shrink-0">▸</span><span>Système de shop fonctionnel avec gestion des ressources</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400 flex-shrink-0">▸</span><span>Système de progression avec difficulté croissante</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400 flex-shrink-0">▸</span><span>Interface utilisateur intuitive et responsive</span></li>
              </ul>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">🛠️ Stack Technologique</h3>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Langage :</strong> C#</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>UI :</strong> WPF</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Runtime :</strong> .NET Framework</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>IDE :</strong> Visual Studio</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 5 : Compétences</h2>
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4"><span class="text-2xl">⚙️</span><h4 class="text-indigo-300 font-bold text-lg">UE Réaliser</h4></div>
              <p class="text-slate-300 text-sm mb-4 font-semibold">Niveau 1 : Développer des applications simples</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC11.01</strong> – Implémenter des conceptions simples</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC11.04</strong> – Développer des interfaces utilisateurs</span></li>
              </ul>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4"><span class="text-2xl">🚀</span><h4 class="text-indigo-300 font-bold text-lg">UE Optimiser</h4></div>
              <p class="text-slate-300 text-sm mb-4 font-semibold">Niveau 1 : Appréhender et construire des algorithmes</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC12.01</strong> – Analyser un problème avec méthode</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC12.02</strong> – Comparer des algorithmes</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Code Source</h2>
          <a href="https://github.com/HonoreBessonMagdelain/StarBound_Legacy" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-lg">
            <span>📂</span><span>Voir le code sur GitHub</span><span>→</span>
          </a>
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
.animation-delay-4000 { animation-delay: 4s; }
</style>
