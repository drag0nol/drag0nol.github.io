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
        <h1 class="text-5xl font-bold text-white mb-4">Semi-Marathon de Beaune</h1>
        <p class="text-indigo-300 text-lg mb-6">Application de gestion des inscriptions — Base de données & Interface</p>

        <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-6 border border-indigo-500/30 mb-8">
          <h2 class="text-xl font-bold text-indigo-200 mb-3">Apprentissages Critiques</h2>
          <ul class="space-y-2 text-slate-300">
            <li>• <span class="text-indigo-300 font-semibold">AC14.01</span> – Mettre à jour et interroger une base de données relationnelle</li>
            <li>• <span class="text-indigo-300 font-semibold">AC14.02</span> – Visualiser des données</li>
            <li>• <span class="text-indigo-300 font-semibold">AC11.02</span> – Élaborer des conceptions simples</li>
            <li>• <span class="text-indigo-300 font-semibold">AC11.04</span> – Développer des interfaces utilisateurs</li>
            <li>• <span class="text-indigo-300 font-semibold">AC22.01</span> – Choisir des structures de données complexes adaptées au problème</li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-6 text-slate-300">
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🎓</span>
            <span><strong class="text-indigo-300">SAE</strong> — BUT Informatique</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">👥</span>
            <span><strong class="text-indigo-300">Projet en équipe de 2</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🗄️</span>
            <span><strong class="text-indigo-300">PostgreSQL</strong> / <strong class="text-indigo-300">WPF</strong> / <strong class="text-indigo-300">REST</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🏃</span>
            <span><strong class="text-indigo-300">Gestion d'événement</strong></span>
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto px-6 py-16">
        <!-- Concept & Objectif -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 1 : Concept & Objectif</h2>
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
            <p class="text-slate-300 text-lg leading-relaxed mb-4">
              Application développée pour gérer les <strong class="text-indigo-300">inscriptions des coureurs au Semi-Marathon de Beaune</strong>. L'objectif était de créer un système permettant de visualiser les coureurs inscrits, les courses disponibles et d'effectuer des inscriptions de manière intuitive.
            </p>
            <p class="text-slate-300 text-lg leading-relaxed">
              Ce projet a mis l'accent sur la <strong class="text-indigo-300">gestion de base de données relationnelle</strong> et le <strong class="text-indigo-300">développement d'interfaces utilisateurs ergonomiques</strong>.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">🎯 Objectif</h3>
              <p class="text-slate-300 text-sm">Faciliter la gestion des inscriptions pour l'événement du Semi-Marathon de Beaune</p>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">📊 Type</h3>
              <p class="text-slate-300 text-sm">Application de gestion événementielle avec base de données</p>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">👤 Utilisateurs</h3>
              <p class="text-slate-300 text-sm">Organisateurs de l'événement et personnel d'inscription</p>
            </div>
          </div>
        </section>

        <!-- Fonctionnalités -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 2 : Fonctionnalités Principales</h2>
          
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">🔐 Système d'Authentification</h3>
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
              <p class="text-slate-300 text-lg leading-relaxed mb-4">
                Page de connexion sécurisée permettant aux organisateurs d'accéder à l'interface de gestion. Authentification basée sur identifiants stockés en base de données.
              </p>
            </div>

            <div>
              <p class="text-slate-400 text-sm mb-2">📸 Page de Connexion</p>
              <div class="bg-slate-800/50 rounded-lg border border-indigo-500/30 overflow-hidden shadow-lg">
                <img src="@/assets/projects/marathon-beaune/connexion.png" alt="Page de connexion Marathon de Beaune" class="w-full h-auto object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">📋 Gestion des Inscriptions</h3>
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">👥</span>
                  <h4 class="text-indigo-300 font-bold text-lg">Liste des Coureurs</h4>
                </div>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• Affichage de tous les coureurs inscrits</li>
                  <li>• Informations détaillées par coureur</li>
                  <li>• Recherche et filtrage des participants</li>
                  <li>• Mise à jour des données en temps réel</li>
                </ul>
              </div>

              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">🏁</span>
                  <h4 class="text-indigo-300 font-bold text-lg">Liste des Courses</h4>
                </div>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• Affichage des courses disponibles</li>
                  <li>• Détails des parcours et distances</li>
                  <li>• Horaires et points de départ</li>
                  <li>• Nombre d'inscrits par course</li>
                </ul>
              </div>
            </div>

            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
              <h4 class="text-indigo-300 font-bold text-lg mb-4">✅ Inscription à une Course</h4>
              <p class="text-slate-300 leading-relaxed mb-4">
                Fonctionnalité permettant de <strong class="text-indigo-300">sélectionner un coureur et l'inscrire à une course spécifique</strong>. Le système vérifie les contraintes (places disponibles, doublons) et met à jour la base de données instantanément.
              </p>
              <ul class="text-slate-300 space-y-2">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Sélection intuitive du coureur dans la liste</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Choix de la course parmi celles disponibles</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Validation et confirmation d'inscription</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Mise à jour automatique des listes et compteurs</span></li>
              </ul>
            </div>

            <div>
              <p class="text-slate-400 text-sm mb-2">📸 Interface Principale (Menu)</p>
              <div class="bg-slate-800/50 rounded-lg border border-indigo-500/30 overflow-hidden shadow-lg">
                <img src="@/assets/projects/marathon-beaune/menu.png" alt="Menu principal Marathon de Beaune" class="w-full h-auto object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <!-- Base de Données -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 3 : Architecture Base de Données</h2>
          
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-8">
            <p class="text-slate-300 text-lg leading-relaxed mb-4">
              Base de données <strong class="text-indigo-300">PostgreSQL</strong> conçue pour gérer les <strong class="text-indigo-300">coureurs, courses et inscriptions</strong>. Architecture <strong class="text-indigo-300">REST</strong> avec Entity Framework pour l'accès aux données, garantissant l'intégrité et facilitant les requêtes.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">🗄️ Tables Principales</h3>
              <ul class="text-slate-300 space-y-3 text-sm">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Coureurs</strong> : informations personnelles (nom, prénom, club, catégorie...)</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Courses</strong> : détails des épreuves (distance, horaire, prix...)</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Inscriptions</strong> : liaison coureurs ↔ courses avec dossard et statut</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Utilisateurs</strong> : authentification pour les organisateurs</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">🔗 Opérations CRUD</h3>
              <ul class="text-slate-300 space-y-3 text-sm">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>CREATE</strong> : ajout de nouveaux coureurs et inscriptions</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>READ</strong> : requêtes SQL pour afficher listes et détails</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>UPDATE</strong> : modification des informations existantes</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>DELETE</strong> : suppression d'inscriptions si nécessaire</span></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Stack Technique -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 4 : Architecture & Technologies</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">🛠️ Stack Technologique</h3>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Langage :</strong> C#</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Interface :</strong> WPF (Windows Presentation Foundation)</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Base de données :</strong> PostgreSQL</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>ORM :</strong> Entity Framework Core</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Architecture :</strong> REST API</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>IDE :</strong> Visual Studio</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">✅ Réalisations Techniques</h3>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Modèle de données PostgreSQL normalisé</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>API REST avec Entity Framework Core</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Requêtes LINQ et migrations automatiques</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Interface WPF réactive et ergonomique</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Gestion des erreurs et validations</span></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Compétences -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 5 : Compétences Mobilisées</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">🗄️</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Gérer</h4>
              </div>
              <p class="text-slate-300 text-sm mb-4 font-semibold">Niveau 1 : Concevoir et mettre en place une base de données</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC14.01</strong> – Mettre à jour et interroger une base de données relationnelle</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC14.02</strong> – Visualiser des données</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">⚙️</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Réaliser</h4>
              </div>
              <p class="text-slate-300 text-sm mb-4 font-semibold">Niveau 1 : Développer des applications simples</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC11.02</strong> – Élaborer des conceptions simples</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC11.04</strong> – Développer des interfaces utilisateurs</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">🚀</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Optimiser</h4>
              </div>
              <p class="text-slate-300 text-sm mb-4 font-semibold">Niveau 2 : Structures de données adaptées</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC22.01</strong> – Choisir des structures de données complexes adaptées au problème</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">💡</span>
                <h4 class="text-indigo-300 font-bold text-lg">Points Forts</h4>
              </div>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Modélisation relationnelle complète</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Interface ergonomique et intuitive</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Gestion efficace des inscriptions</span></li>
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
