<script setup>
import { ref } from 'vue'

const expandedUE = ref([])

const toggleUE = (ueId) => {
  const index = expandedUE.value.indexOf(ueId)
  if (index > -1) {
    expandedUE.value.splice(index, 1)
  } else {
    expandedUE.value.push(ueId)
  }
}

const isExpanded = (ueId) => {
  return expandedUE.value.includes(ueId)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-6xl mx-auto px-6 flex flex-col items-center">
        <h1 class="text-4xl font-bold text-white mb-2">Mes Compétences</h1>
        <p class="text-indigo-300 text-lg mb-4">Compétences acquises durant le BUT Informatique — Parcours A</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-12">
        <!-- Section Compétences organisée par UE (référentiel PN) -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold text-white mb-12 text-center">Compétences et apprentissages critiques</h2>

          <p class="text-slate-300 text-center mb-8">Cliquez sur une carte pour afficher les apprentissages critiques (AC).</p>

          <div class="grid grid-cols-1 gap-6">
            <!-- UE 1 - Réaliser -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-400 transition-all">
              <div class="flex items-center justify-between cursor-pointer hover:bg-indigo-500/10 rounded-xl p-2 -m-2 transition-colors" @click="toggleUE('ue1')">
                <div class="flex-1">
                  <h3 class="text-2xl font-extrabold text-indigo-200 mb-2">Réaliser — Conception & développement</h3>
                  <p class="text-slate-300 text-sm mb-2">Concevoir, coder, tester et intégrer une solution informatique.</p>
                </div>
                <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: isExpanded('ue1') ? 'rotate(180deg)' : 'rotate(0deg)' }">
                  ▼
                </div>
              </div>
              <div v-if="isExpanded('ue1')" class="mt-4 pt-4 border-t border-indigo-500/30" @click.stop>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold">Niveau 1 : Développer des applications informatiques simples</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC11.01 : Implémenter des conceptions simples</span>
                    <router-link to="/projects/starbound-legacy" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors">StarBound →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC11.02 : Élaborer des conceptions simples</span>
                    <router-link to="/projects/marathon-beaune" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Marathon →</router-link>
                  </li>
                  <li>• AC11.03 : Faire des essais et évaluer leurs résultats en regard des spécifications</li>
                  <li class="flex items-center justify-between">
                    <span>• AC11.04 : Développer des interfaces utilisateurs</span>
                    <div class="flex gap-1">
                      <router-link to="/projects/starbound-legacy" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors">StarBound →</router-link>
                      <router-link to="/projects/marathon-beaune" class="px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Marathon →</router-link>
                    </div>
                  </li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 2 : Partir des exigences et aller jusqu'à une application complète</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC21.01 : Élaborer et implémenter les spécifications fonctionnelles et non fonctionnelles à partir des exigences</span>
                    <router-link to="/projects/savoy-sidesktop" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Savoy →</router-link>
                  </li>
                  <li>• AC21.02 : Appliquer des principes d'accessibilité et d'ergonomie</li>
                  <li>• AC21.03 : Adopter de bonnes pratiques de conception et de programmation</li>
                  <li class="flex items-center justify-between">
                    <span>• AC21.04 : Vérifier et valider la qualité de l'application par les tests</span>
                    <router-link to="/projects/savoy-sidesktop" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Savoy →</router-link>
                  </li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 3 : Adapter des applications sur un ensemble de supports (embarqué, web, mobile, IoT...)</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC31.01 : Choisir et implémenter les architectures adaptées</span>
                    <router-link to="/projects/caspino" class="ml-2 px-2 py-1 bg-amber-600/50 hover:bg-amber-600 text-amber-100 text-xs rounded transition-colors whitespace-nowrap">Caspino →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC31.02 : Faire évoluer une application existante</span>
                    <router-link to="/projects/savoy-sidesktop" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Savoy →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC31.03 : Intégrer des solutions dans un environnement de production</span>
                    <router-link to="/projects/caspino" class="ml-2 px-2 py-1 bg-amber-600/50 hover:bg-amber-600 text-amber-100 text-xs rounded transition-colors whitespace-nowrap">Caspino →</router-link>
                  </li>
                </ul>
              </div>
            </div>

            <!-- UE 2 - Optimiser -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-400 transition-all">
              <div class="flex items-center justify-between cursor-pointer hover:bg-indigo-500/10 rounded-xl p-2 -m-2 transition-colors" @click="toggleUE('ue2')">
                <div class="flex-1">
                  <h3 class="text-2xl font-extrabold text-indigo-200 mb-2">Optimiser — Performance & efficience</h3>
                  <p class="text-slate-300 text-sm mb-2">Optimiser le temps d'exécution et la consommation de ressources.</p>
                </div>
                <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: isExpanded('ue2') ? 'rotate(180deg)' : 'rotate(0deg)' }">
                  ▼
                </div>
              </div>
              <div v-if="isExpanded('ue2')" class="mt-4 pt-4 border-t border-indigo-500/30" @click.stop>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold">Niveau 1 : Appréhender et construire des algorithmes</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC12.01 : Analyser un problème avec méthode (découpage, structure de données...)</span>
                    <router-link to="/projects/starbound-legacy" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">StarBound →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC12.02 : Comparer des algorithmes pour des problèmes classiques</span>
                    <router-link to="/projects/starbound-legacy" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">StarBound →</router-link>
                  </li>
                  <li>• AC12.03 : Formaliser et mettre en œuvre des outils mathématiques pour l'informatique</li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 2 : Sélectionner les algorithmes adéquats pour répondre à un problème donné</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC22.01 : Choisir des structures de données complexes adaptées au problème</span>
                    <router-link to="/projects/marathon-beaune" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Marathon →</router-link>
                  </li>
                  <li>• AC22.02 : Utiliser des techniques algorithmiques adaptées pour des problèmes complexes</li>
                  <li class="flex items-center justify-between">
                    <span>• AC22.03 : Comprendre les enjeux et moyens de sécurisation des données et du code</span>
                    <router-link to="/projects/savoy-sidesktop" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Savoy →</router-link>
                  </li>
                  <li>• AC22.04 : Évaluer l'impact environnemental et sociétal des solutions proposées</li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 3 : Analyser et optimiser des applications</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li>• AC32.01 : Anticiper les résultats de diverses métriques</li>
                  <li>• AC32.02 : Profiler, analyser et justifier le comportement d'un code existant</li>
                  <li class="flex items-center justify-between">
                    <span>• AC32.03 : Choisir et utiliser des bibliothèques et méthodes dédiées au domaine d'application</span>
                    <router-link to="/projects/caspino" class="ml-2 px-2 py-1 bg-amber-600/50 hover:bg-amber-600 text-amber-100 text-xs rounded transition-colors whitespace-nowrap">Caspino →</router-link>
                  </li>
                </ul>
              </div>
            </div>

            <!-- UE 3 - Administrer -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-400 transition-all">
              <div class="flex items-center justify-between cursor-pointer hover:bg-indigo-500/10 rounded-xl p-2 -m-2 transition-colors" @click="toggleUE('ue3')">
                <div class="flex-1">
                  <h3 class="text-2xl font-extrabold text-indigo-200 mb-2">Administrer — Infrastructures & services</h3>
                  <p class="text-slate-300 text-sm mb-2">Installer, configurer et maintenir infrastructures, services et réseaux.</p>
                </div>
                <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: isExpanded('ue3') ? 'rotate(180deg)' : 'rotate(0deg)' }">
                  ▼
                </div>
              </div>
              <div v-if="isExpanded('ue3')" class="mt-4 pt-4 border-t border-indigo-500/30" @click.stop>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold">Niveau 1 : Installer et configurer un poste de travail</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC13.01 : Identifier les différents composants d'un système numérique</span>
                    <router-link to="/projects/vm-developpement" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">VM →</router-link>
                  </li>
                  <li>• AC13.02 : Utiliser les fonctionnalités de base d'un système multiutilisateurs</li>
                  <li class="flex items-center justify-between">
                    <span>• AC13.03 : Installer et configurer un système d'exploitation et des outils de développement</span>
                    <router-link to="/projects/vm-developpement" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">VM →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC13.04 : Configurer un poste de travail dans un réseau d'entreprise</span>
                    <router-link to="/projects/vm-developpement" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">VM →</router-link>
                  </li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 2 : Déployer des services dans une architecture réseau</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC23.01 : Concevoir et développer des applications communicantes</span>
                    <router-link to="/projects/caspino" class="ml-2 px-2 py-1 bg-amber-600/50 hover:bg-amber-600 text-amber-100 text-xs rounded transition-colors whitespace-nowrap">Caspino →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC23.02 : Utiliser des serveurs et des services réseaux virtualisés</span>
                    <router-link to="/projects/caspino" class="ml-2 px-2 py-1 bg-amber-600/50 hover:bg-amber-600 text-amber-100 text-xs rounded transition-colors whitespace-nowrap">Caspino →</router-link>
                  </li>
                  <li>• AC23.03 : Sécuriser les services et données d'un système</li>
                </ul>
              </div>
            </div>

            <!-- UE 4 - Gérer -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-400 transition-all">
              <div class="flex items-center justify-between cursor-pointer hover:bg-indigo-500/10 rounded-xl p-2 -m-2 transition-colors" @click="toggleUE('ue4')">
                <div class="flex-1">
                  <h3 class="text-2xl font-extrabold text-indigo-200 mb-2">Gérer — Données & pilotage</h3>
                  <p class="text-slate-300 text-sm mb-2">Concevoir et exploiter les données pour le pilotage de l'entreprise.</p>
                </div>
                <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: isExpanded('ue4') ? 'rotate(180deg)' : 'rotate(0deg)' }">
                  ▼
                </div>
              </div>
              <div v-if="isExpanded('ue4')" class="mt-4 pt-4 border-t border-indigo-500/30" @click.stop>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold">Niveau 1 : Concevoir et mettre en place une base de données à partir d'un cahier des charges client</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC14.01 : Mettre à jour et interroger une base de données relationnelle</span>
                    <router-link to="/projects/marathon-beaune" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Marathon →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC14.02 : Visualiser des données</span>
                    <router-link to="/projects/marathon-beaune" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Marathon →</router-link>
                  </li>
                  <li>• AC14.03 : Concevoir une base de données relationnelle à partir d'un cahier des charges</li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 2 : Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC24.01 : Optimiser les modèles de données de l'entreprise</span>
                    <router-link to="/projects/caspino" class="ml-2 px-2 py-1 bg-amber-600/50 hover:bg-amber-600 text-amber-100 text-xs rounded transition-colors whitespace-nowrap">Caspino →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC24.02 : Assurer la sécurité des données (intégrité et confidentialité)</span>
                    <router-link to="/projects/caspino" class="ml-2 px-2 py-1 bg-amber-600/50 hover:bg-amber-600 text-amber-100 text-xs rounded transition-colors whitespace-nowrap">Caspino →</router-link>
                  </li>
                  <li>• AC24.03 : Organiser la restitution de données à travers la programmation et la visualisation</li>
                  <li>• AC24.04 : Manipuler des données hétérogènes</li>
                </ul>
              </div>
            </div>

            <!-- UE 5 - Conduire -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-400 transition-all">
              <div class="flex items-center justify-between cursor-pointer hover:bg-indigo-500/10 rounded-xl p-2 -m-2 transition-colors" @click="toggleUE('ue5')">
                <div class="flex-1">
                  <h3 class="text-2xl font-extrabold text-indigo-200 mb-2">Conduire — Pilotage de projet</h3>
                  <p class="text-slate-300 text-sm mb-2">Organiser et piloter des projets informatiques (classiques ou agiles).</p>
                </div>
                <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: isExpanded('ue5') ? 'rotate(180deg)' : 'rotate(0deg)' }">
                  ▼
                </div>
              </div>
              <div v-if="isExpanded('ue5')" class="mt-4 pt-4 border-t border-indigo-500/30" @click.stop>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold">Niveau 1 : Identifier les besoins métiers des clients et des utilisateurs</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC15.01 : Appréhender les besoins du client et de l'utilisateur</span>
                    <router-link to="/projects/vm-developpement" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">VM →</router-link>
                  </li>
                  <li>• AC15.02 : Mettre en place les outils de gestion de projet</li>
                  <li>• AC15.03 : Identifier les acteurs et les différentes phases d'un cycle de développement</li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 2 : Appliquer une démarche de suivi de projet en fonction des besoins métiers des clients et des utilisateurs</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li class="flex items-center justify-between">
                    <span>• AC25.01 : Identifier les processus présents dans une organisation pour améliorer les SI</span>
                    <router-link to="/projects/vm-developpement" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">VM →</router-link>
                  </li>
                  <li>• AC25.02 : Formaliser les besoins du client et de l'utilisateur</li>
                  <li>• AC25.03 : Identifier les critères de faisabilité d'un projet informatique</li>
                  <li>• AC25.04 : Définir et mettre en œuvre une démarche de suivi de projet</li>
                </ul>
              </div>
            </div>

            <!-- UE 6 - Collaborer -->
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-400 transition-all">
              <div class="flex items-center justify-between cursor-pointer hover:bg-indigo-500/10 rounded-xl p-2 -m-2 transition-colors" @click="toggleUE('ue6')">
                <div class="flex-1">
                  <h3 class="text-2xl font-extrabold text-indigo-200 mb-2">Collaborer — Travail en équipe</h3>
                  <p class="text-slate-300 text-sm mb-2">Acquérir et mobiliser les aptitudes pour travailler efficacement en équipe.</p>
                </div>
                <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: isExpanded('ue6') ? 'rotate(180deg)' : 'rotate(0deg)' }">
                  ▼
                </div>
              </div>
              <div v-if="isExpanded('ue6')" class="mt-4 pt-4 border-t border-indigo-500/30" @click.stop>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold">Niveau 1 : Identifier ses aptitudes pour travailler dans une équipe</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li>• AC16.01 : Appréhender l'écosystème numérique</li>
                  <li>• AC16.02 : Découvrir les aptitudes requises selon les différents secteurs informatiques</li>
                  <li class="flex items-center justify-between">
                    <span>• AC16.03 : Identifier les statuts, fonctions et rôles de chaque membre d'une équipe pluridisciplinaire</span>
                    <router-link to="/projects/hunter" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Hunter →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC16.04 : Acquérir les compétences interpersonnelles pour travailler en équipe</span>
                    <router-link to="/projects/hunter" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Hunter →</router-link>
                  </li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 2 : Situer son rôle et ses missions au sein d'une équipe informatique</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li>• AC26.01 : Comprendre la diversité, la structure et la dimension de l'informatique dans une organisation</li>
                  <li class="flex items-center justify-between">
                    <span>• AC26.02 : Appliquer une démarche pour intégrer une équipe informatique au sein d'une organisation</span>
                    <router-link to="/projects/hunter" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Hunter →</router-link>
                  </li>
                  <li class="flex items-center justify-between">
                    <span>• AC26.03 : Mobiliser les compétences interpersonnelles pour travailler dans une équipe informatique</span>
                    <router-link to="/projects/hunter" class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap">Hunter →</router-link>
                  </li>
                  <li>• AC26.04 : Rendre compte de son activité professionnelle</li>
                </ul>
                <p class="text-indigo-300 text-lg mb-3 italic font-bold mt-4">Niveau 3 : Manager une équipe informatique</p>
                <ul class="text-slate-300 text-sm space-y-2">
                  <li>• AC36.01 : Organiser et partager une veille technologique et informationnelle</li>
                  <li>• AC36.02 : Identifier les enjeux de l'économie de l'innovation numérique</li>
                  <li>• AC36.03 : Guider la conduite du changement informatique au sein d'une organisation</li>
                  <li>• AC36.04 : Accompagner le management de projet informatique</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Section Preuves & Réalisations -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold text-white mb-8 text-center">Mes projets</h2>
          <div class="flex justify-center">
            <router-link to="/projects" class="group">
              <div class="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full w-40 h-40 flex items-center justify-center mx-auto mb-4 shadow-2xl hover:shadow-indigo-600/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div class="text-center">
                  <div class="text-3xl mb-2">💾</div>
                  <p class="text-white font-bold text-sm">Projets</p>
                </div>
              </div>
            </router-link>
          </div>
        </section>

        <!-- CTA -->
        <section class="max-w-6xl mx-auto px-6 py-12 text-center">
          <h2 class="text-3xl font-bold text-white mb-8">Envie d'en voir plus ?</h2>
          <div class="flex gap-4 justify-center">
            <router-link to="/experiences" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg">Voir mes expériences</router-link>
            <router-link to="/" class="px-8 py-3 border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-bold rounded-full transition-all duration-300">À propos</router-link>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
</style>
