<script setup>
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-5xl mx-auto px-6">
        <p class="text-sm uppercase tracking-[0.2em] text-indigo-300/70">SAE Semestre 5 — Projet en cours</p>
        <h1 class="text-5xl font-bold text-white mb-4">🎰 CASPINO</h1>
        <p class="text-indigo-300 text-lg mb-6">Casino en ligne connecté — Kotlin Mobile + Raspberry Pi + IoT — Démarré le 27 octobre 2024</p>

        <div class="bg-gradient-to-r from-amber-500/20 to-slate-700/20 rounded-2xl p-6 border border-amber-500/30 mb-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">⚠️</span>
            <h2 class="text-xl font-bold text-amber-200">Projet en cours de développement</h2>
          </div>
          <p class="text-slate-300 text-sm">Ce projet est actuellement en développement dans le cadre de la SAE du semestre 5. Certaines fonctionnalités sont encore en phase de conception et d'implémentation.</p>
        </div>

        <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-6 border border-indigo-500/30 mb-8">
          <h2 class="text-xl font-bold text-indigo-200 mb-3">Apprentissages Critiques mobilisés</h2>
          <ul class="space-y-2 text-slate-300">
            <li>• <span class="text-indigo-300 font-semibold">AC31.01</span> – Choisir et implémenter les architectures adaptées (multi-serveurs Raspberry Pi)</li>
            <li>• <span class="text-indigo-300 font-semibold">AC31.03</span> – Intégrer des solutions dans un environnement de production</li>
            <li>• <span class="text-indigo-300 font-semibold">AC32.03</span> – Choisir et utiliser des bibliothèques et méthodes dédiées au domaine</li>
            <li>• <span class="text-indigo-300 font-semibold">AC23.01</span> – Concevoir et développer des applications communicantes</li>
            <li>• <span class="text-indigo-300 font-semibold">AC23.02</span> – Utiliser des serveurs et des services réseaux virtualisés</li>
            <li>• <span class="text-indigo-300 font-semibold">AC24.01</span> – Optimiser les modèles de données de l'entreprise</li>
            <li>• <span class="text-indigo-300 font-semibold">AC24.02</span> – Assurer la sécurité des données (intégrité et confidentialité)</li>
            <li>• <span class="text-indigo-300 font-semibold">AC26.03</span> – Mobiliser les compétences interpersonnelles pour travailler dans une équipe</li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-6 text-slate-300">
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">👥</span>
            <span><strong class="text-indigo-300">Équipe de 3</strong> personnes</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🎓</span>
            <span><strong class="text-indigo-300">SAE</strong> — Semestre 5 BUT Informatique</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">📱</span>
            <span><strong class="text-indigo-300">Kotlin</strong> / <strong class="text-indigo-300">Raspberry Pi</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🔌</span>
            <span><strong class="text-indigo-300">IoT</strong> intégré</span>
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto px-6 py-16">
        <!-- Concept & Objectif -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 1 : Concept & Vision</h2>
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
            <p class="text-slate-300 text-lg leading-relaxed mb-4">
              <strong class="text-indigo-300">CASPINO</strong> est un casino en ligne innovant développé dans le cadre de la SAE du semestre 5. Le projet combine <strong class="text-indigo-300">application mobile Kotlin</strong>, <strong class="text-indigo-300">serveurs distribués Raspberry Pi</strong> et <strong class="text-indigo-300">intégration IoT</strong> pour créer une expérience de jeu immersive et connectée.
            </p>
            <p class="text-slate-300 text-lg leading-relaxed">
              L'architecture innovante repose sur des <strong class="text-indigo-300">Raspberry Pi dédiés pour chaque jeu</strong>, offrant modularité, scalabilité et une expérience temps réel optimisée.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">🎯 Objectif</h3>
              <p class="text-slate-300 text-sm">Casino en ligne complet avec architecture distribuée et bonus IoT immersifs</p>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">🎲 Genre</h3>
              <p class="text-slate-300 text-sm">Application de jeux d'argent fictif — Machine à sous & jeux de casino</p>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">🚀 Innovation</h3>
              <p class="text-slate-300 text-sm">Intégration IoT pour alarmes de jackpot et lumières de fidélité</p>
            </div>
          </div>
        </section>

        <!-- Architecture & Technologies -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 2 : Architecture & Technologies</h2>
          
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">🏗️ Architecture Distribuée</h3>
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
              <p class="text-slate-300 text-lg leading-relaxed mb-4">
                Chaque jeu du casino tourne sur son <strong class="text-indigo-300">propre serveur Raspberry Pi</strong>, permettant une architecture modulaire et scalable. Cette approche offre isolation des jeux, maintenance simplifiée et montée en charge flexible.
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">📱</span>
                  <h4 class="text-indigo-300 font-bold text-lg">Client Mobile</h4>
                </div>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• <strong>Kotlin</strong> pour Android</li>
                  <li>• Interface utilisateur moderne et réactive</li>
                  <li>• Communication temps réel avec les serveurs</li>
                  <li>• Gestion des comptes joueurs</li>
                  <li>• Historique des gains et transactions</li>
                </ul>
              </div>

              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">🖥️</span>
                  <h4 class="text-indigo-300 font-bold text-lg">Serveurs Raspberry Pi</h4>
                </div>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• Un Raspberry Pi par jeu de casino</li>
                  <li>• Logique métier isolée</li>
                  <li>• Calcul des gains et probabilités</li>
                  <li>• API REST pour communication mobile</li>
                  <li>• Synchronisation base de données</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">🗄️ Gestion des Données</h3>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Base de données centralisée</strong> pour les comptes joueurs, soldes et transactions</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Historique des parties</strong> : conservation des gains, pertes et jackpots</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Système de fidélité</strong> : points accumulés, niveaux et bonus</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Sécurité</strong> : chiffrement des données sensibles et transactions sécurisées</span></li>
              </ul>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">🛠️ Stack Technologique</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <h4 class="text-indigo-300 font-bold text-lg mb-4">Front-end Mobile</h4>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• <strong>Kotlin</strong> (Android)</li>
                  <li>• Jetpack Compose / XML layouts</li>
                  <li>• Retrofit pour API REST</li>
                  <li>• Coroutines pour asynchrone</li>
                </ul>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <h4 class="text-indigo-300 font-bold text-lg mb-4">Back-end & Infrastructure</h4>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• <strong>Raspberry Pi</strong> (serveurs jeux)</li>
                  <li>• Python / Node.js (API serveurs)</li>
                  <li>• PostgreSQL / MySQL (BDD)</li>
                  <li>• GPIO pour contrôle IoT</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Fonctionnalités IoT -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 3 : Système de Fidélité & IoT</h2>
          <div class="bg-gradient-to-r from-amber-500/20 to-slate-700/20 rounded-2xl p-8 border border-amber-500/30 mb-8">
            <p class="text-slate-300 text-lg leading-relaxed mb-4">
              Les joueurs peuvent <strong class="text-amber-300">activer une alarme et une lumière connectées</strong> grâce à leurs gains et points de fidélité. L'alarme se déclenche automatiquement lors d'un <strong class="text-amber-300">jackpot aux machines à sous</strong>, créant une expérience immersive et festive.
            </p>
          </div>

          <h3 class="text-2xl font-bold text-indigo-200 mb-6">🎁 Bonus de Fidélité</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">🚨</span>
                <h4 class="text-indigo-300 font-bold text-lg">Alarme Connectée</h4>
              </div>
              <ul class="text-slate-300 space-y-2 text-sm">
                <li>• Déclenchement automatique sur jackpot</li>
                <li>• Activation manuelle via points fidélité</li>
                <li>• Sons personnalisables</li>
                <li>• Contrôle depuis l'app mobile</li>
              </ul>
            </div>

            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">💡</span>
                <h4 class="text-indigo-300 font-bold text-lg">Lumière de Fidélité</h4>
              </div>
              <ul class="text-slate-300 space-y-2 text-sm">
                <li>• Activation par gains accumulés</li>
                <li>• Changements de couleur selon niveaux</li>
                <li>• Animations sur gros gains</li>
                <li>• Intégration Raspberry Pi GPIO</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Jeux Disponibles -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 4 : Jeux & Mécaniques</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20">
              <div class="text-4xl mb-3 text-center">🎰</div>
              <h4 class="text-indigo-300 font-bold text-lg text-center mb-3">Machine à Sous</h4>
              <p class="text-slate-300 text-sm">Jackpots progressifs, bonus tours, multiplicateurs et alarme IoT lors des gros gains.</p>
            </div>

            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20">
              <div class="text-4xl mb-3 text-center">🃏</div>
              <h4 class="text-indigo-300 font-bold text-lg text-center mb-3">Jeux de Cartes</h4>
              <p class="text-slate-300 text-sm">Blackjack, Poker et autres classiques avec serveurs dédiés pour chaque variante.</p>
            </div>

            <div class="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-lg p-6 border border-indigo-500/20">
              <div class="text-4xl mb-3 text-center">🎲</div>
              <h4 class="text-indigo-300 font-bold text-lg text-center mb-3">Jeux de Dés</h4>
              <p class="text-slate-300 text-sm">Craps et autres jeux de hasard avec animations temps réel et système de paris.</p>
            </div>
          </div>
        </section>

        <!-- Travail d'Équipe -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 5 : Organisation & Collaboration</h2>
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-8">
            <p class="text-slate-300 text-lg leading-relaxed">
              Projet réalisé en <strong class="text-indigo-300">équipe de 3 personnes</strong> avec répartition des responsabilités : développement mobile (Kotlin), infrastructure serveurs (Raspberry Pi) et intégration IoT + base de données. Communication régulière et revues de code pour assurer la cohésion du projet.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">📱</span>
                <h4 class="text-indigo-300 font-bold text-lg">Mobile Dev</h4>
              </div>
              <ul class="text-slate-300 space-y-2 text-sm">
                <li>• Application Kotlin Android</li>
                <li>• UI/UX des jeux</li>
                <li>• API REST client</li>
                <li>• Gestion états utilisateur</li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">🖥️</span>
                <h4 class="text-indigo-300 font-bold text-lg">Infrastructure</h4>
              </div>
              <ul class="text-slate-300 space-y-2 text-sm">
                <li>• Configuration Raspberry Pi</li>
                <li>• Serveurs jeux (API)</li>
                <li>• Déploiement & monitoring</li>
                <li>• Réseau & sécurité</li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">🔌</span>
                <h4 class="text-indigo-300 font-bold text-lg">IoT & Data</h4>
              </div>
              <ul class="text-slate-300 space-y-2 text-sm">
                <li>• Alarme & lumières GPIO</li>
                <li>• Base de données</li>
                <li>• Système de fidélité</li>
                <li>• Intégration hardware</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Compétences -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 6 : Compétences Mobilisées</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">⚙️</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Réaliser & Optimiser</h4>
              </div>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Architecture multi-serveurs distribuée</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Développement mobile Kotlin performant</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Optimisation temps réel et scalabilité</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">🖥️</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Administrer</h4>
              </div>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Configuration & déploiement Raspberry Pi</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Administration serveurs Linux</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Sécurisation des services réseaux</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">🗄️</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Gérer</h4>
              </div>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Conception base de données relationnelle</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Gestion transactions et intégrité données</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Requêtes optimisées et indexation</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">👥</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Collaborer & Conduire</h4>
              </div>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Travail en équipe de 3 avec répartition claire</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Gestion de projet SAE (planification, suivi)</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Communication technique et coordination</span></li>
              </ul>
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
.animation-delay-4000 { animation-delay: 4s; }
</style>
