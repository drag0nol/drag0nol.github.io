<script setup>
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-5xl mx-auto px-6">
        <p class="text-sm uppercase tracking-[0.2em] text-indigo-300/70">Projet étudiant — TP</p>
        <h1 class="text-5xl font-bold text-white mb-4">VM Développement Optimisée</h1>
        <p class="text-indigo-300 text-lg mb-6">Configuration d'une machine virtuelle pour environnement de développement</p>

        <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-6 border border-indigo-500/30 mb-8">
          <h2 class="text-xl font-bold text-indigo-200 mb-3">Apprentissages Critiques</h2>
          <ul class="space-y-2 text-slate-300">
            <li>• <span class="text-indigo-300 font-semibold">AC13.03</span> – Installer et configurer un système d'exploitation et des outils de développement</li>
            <li>• <span class="text-indigo-300 font-semibold">AC13.04</span> – Configurer un poste de travail dans un réseau d'entreprise</li>
            <li>• <span class="text-indigo-300 font-semibold">AC15.01</span> – Appréhender les besoins du client et de l'utilisateur</li>
            <li>• <span class="text-indigo-300 font-semibold">AC13.01</span> – Identifier les différents composants d'un système numérique</li>
            <li>• <span class="text-indigo-300 font-semibold">AC25.01</span> – Accompagner les utilisateurs et favoriser l'autonomie</li>
          </ul>
        </div>

        <div class="flex flex-wrap gap-6 text-slate-300">
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🎓</span>
            <span><strong class="text-indigo-300">TP</strong> — BUT Informatique</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">👥</span>
            <span><strong class="text-indigo-300">Équipe de 2</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">💻</span>
            <span><strong class="text-indigo-300">VirtualBox</strong> / <strong class="text-indigo-300">Configuration Système</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-indigo-400 text-2xl">🛠️</span>
            <span><strong class="text-indigo-300">Administration Systèmes</strong></span>
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto px-6 py-16">
        <!-- Concept & Objectif -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 1 : Concept & Objectif</h2>
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
            <p class="text-slate-300 text-lg leading-relaxed mb-4">
              Projet réalisé en binôme consistant à <strong class="text-indigo-300">créer une machine virtuelle pour un environnement de développement léger et optimisé</strong>. L'objectif était de répondre aux besoins spécifiques d'un utilisateur en configurant une VM complète avec tous les outils nécessaires.
            </p>
            <p class="text-slate-300 text-lg leading-relaxed">
              Ce projet a mis l'accent sur l'<strong class="text-indigo-300">analyse des besoins utilisateur</strong>, l'<strong class="text-indigo-300">installation système</strong>, la <strong class="text-indigo-300">configuration réseau</strong> et le <strong class="text-indigo-300">déploiement d'outils de développement</strong>.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">🎯 Objectif</h3>
              <p class="text-slate-300 text-sm">Créer un environnement de développement léger, optimisé et prêt à l'emploi</p>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">📊 Type</h3>
              <p class="text-slate-300 text-sm">Configuration système et administration réseau</p>
            </div>
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-3">👤 Utilisateurs</h3>
              <p class="text-slate-300 text-sm">Développeur nécessitant un environnement isolé et performant</p>
            </div>
          </div>
        </section>

        <!-- Besoins & Analyse -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 2 : Analyse des Besoins</h2>
          
          <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-8">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">📋 Cahier des Charges Utilisateur</h3>
            <p class="text-slate-300 text-lg leading-relaxed mb-4">
              Après échange avec l'utilisateur, nous avons identifié les besoins suivants :
            </p>
            <ul class="text-slate-300 space-y-3">
              <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Environnement léger</strong> : ressources optimisées pour ne pas surcharger la machine hôte</span></li>
              <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Outils de développement</strong> : IDE complet (Visual Studio) et outils annexes</span></li>
              <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Connectivité réseau</strong> : accès internet et intégration au réseau d'entreprise</span></li>
              <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Facilité d'utilisation</strong> : environnement prêt à l'emploi, sans configuration supplémentaire</span></li>
              <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Performance</strong> : temps de démarrage rapide et exécution fluide</span></li>
            </ul>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">👤</span>
                <h4 class="text-indigo-300 font-bold text-lg">Profil Utilisateur</h4>
              </div>
              <ul class="text-slate-300 space-y-2 text-sm">
                <li>• Développeur avec besoins spécifiques</li>
                <li>• Besoin d'isolation pour les tests</li>
                <li>• Ressources machine limitées</li>
                <li>• Intégration réseau d'entreprise</li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">⚡</span>
                <h4 class="text-indigo-300 font-bold text-lg">Contraintes Identifiées</h4>
              </div>
              <ul class="text-slate-300 space-y-2 text-sm">
                <li>• RAM limitée (allocation optimale)</li>
                <li>• Espace disque à minimiser</li>
                <li>• Performances à maintenir</li>
                <li>• Compatibilité réseau requise</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Mise en Œuvre -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 3 : Configuration & Installation</h2>
          
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">🖥️ Création de la Machine Virtuelle</h3>
            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30 mb-6">
              <h4 class="text-indigo-300 font-bold text-lg mb-4">VirtualBox — Configuration Matérielle</h4>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Système d'exploitation</strong> : Windows 10/11 ou Linux (selon besoins)</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>RAM allouée</strong> : optimisée selon machine hôte (4-8 GB)</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Stockage</strong> : disque virtuel dynamique pour économiser l'espace</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Processeurs</strong> : allocation de cœurs adaptée</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Carte réseau</strong> : mode pont pour intégration réseau d'entreprise</span></li>
              </ul>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-2xl font-bold text-indigo-200 mb-6">🔧 Installation du Système & Outils</h3>
            <div class="grid md:grid-cols-2 gap-6 mb-8">
              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">💿</span>
                  <h4 class="text-indigo-300 font-bold text-lg">Système d'Exploitation</h4>
                </div>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• Installation OS depuis ISO</li>
                  <li>• Configuration initiale utilisateur</li>
                  <li>• Mises à jour système</li>
                  <li>• Optimisation des services</li>
                  <li>• Drivers et Guest Additions</li>
                </ul>
              </div>

              <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
                <div class="flex items-center gap-3 mb-4">
                  <span class="text-3xl">🛠️</span>
                  <h4 class="text-indigo-300 font-bold text-lg">Outils de Développement</h4>
                </div>
                <ul class="text-slate-300 space-y-2 text-sm">
                  <li>• <strong>Visual Studio</strong> (IDE principal)</li>
                  <li>• Compilateurs et SDKs</li>
                  <li>• Git & gestionnaire de versions</li>
                  <li>• Navigateurs web pour tests</li>
                  <li>• Outils de débogage</li>
                </ul>
              </div>
            </div>

            <div class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-2xl p-8 border border-indigo-500/30">
              <h4 class="text-indigo-300 font-bold text-lg mb-4">🌐 Configuration Réseau d'Entreprise</h4>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Mode pont</strong> : intégration directe au réseau local</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Adresse IP</strong> : configuration DHCP ou IP fixe selon politique</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>DNS</strong> : serveurs d'entreprise configurés</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Partage de fichiers</strong> : accès aux ressources partagées</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span><strong>Tests de connectivité</strong> : validation ping et accès services</span></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Optimisations -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 4 : Optimisations & Performance</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">⚡ Optimisations Système</h3>
              <ul class="text-slate-300 space-y-3 text-sm">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Désactivation des services inutiles</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Effets visuels minimisés</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Démarrage rapide configuré</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Disque virtuel optimisé (allocation dynamique)</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Mémoire virtuelle ajustée</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">✅ Validation & Tests</h3>
              <ul class="text-slate-300 space-y-3 text-sm">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Tests de performance (CPU, RAM, disque)</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Validation connectivité réseau</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Tests compilation et débogage</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Vérification accès ressources partagées</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Formation utilisateur final</span></li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Stack Technique -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-6 pb-4 border-b border-indigo-500/30">Partie 5 : Technologies & Outils</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">🛠️ Stack Technologique</h3>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Virtualisation :</strong> VirtualBox</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>OS :</strong> Windows 10/11 ou Linux</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>IDE :</strong> Visual Studio</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Réseau :</strong> Mode pont, DHCP/IP fixe</span></li>
                <li class="flex items-center gap-3"><span class="text-indigo-400">▫️</span><span><strong>Outils :</strong> Git, compilateurs, SDKs</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <h3 class="text-indigo-300 font-bold text-lg mb-4">✅ Réalisations Techniques</h3>
              <ul class="text-slate-300 space-y-3">
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>VM optimisée et performante</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Intégration réseau d'entreprise réussie</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Environnement de développement complet</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Documentation de configuration</span></li>
                <li class="flex items-start gap-3"><span class="text-indigo-400">▸</span><span>Formation et accompagnement utilisateur</span></li>
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
                <span class="text-2xl">🖥️</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Administrer</h4>
              </div>
              <p class="text-slate-300 text-sm mb-4 font-semibold">Niveau 1 : Installer et configurer un poste de travail</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC13.01</strong> – Identifier les différents composants d'un système numérique</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC13.03</strong> – Installer et configurer un système d'exploitation et des outils de développement</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC13.04</strong> – Configurer un poste de travail dans un réseau d'entreprise</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">🤝</span>
                <h4 class="text-indigo-300 font-bold text-lg">UE Collaborer</h4>
              </div>
              <p class="text-slate-300 text-sm mb-4 font-semibold">Niveau 1 : Identifier les besoins métiers</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC15.01</strong> – Appréhender les besoins du client et de l'utilisateur</span></li>
              </ul>
              <p class="text-slate-300 text-sm mb-4 mt-4 font-semibold">Niveau 2 : Satisfaire les besoins des utilisateurs</p>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span><strong>AC25.01</strong> – Accompagner les utilisateurs et favoriser l'autonomie</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">👥</span>
                <h4 class="text-indigo-300 font-bold text-lg">Travail en Équipe</h4>
              </div>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Répartition des tâches entre binôme</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Collaboration sur configuration système</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Communication avec utilisateur final</span></li>
              </ul>
            </div>

            <div class="bg-slate-800/50 rounded-lg p-6 border border-indigo-500/20">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-2xl">💡</span>
                <h4 class="text-indigo-300 font-bold text-lg">Points Forts</h4>
              </div>
              <ul class="text-slate-300 text-sm space-y-2">
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Analyse précise des besoins</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Configuration réseau maîtrisée</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Environnement optimisé et performant</span></li>
                <li class="flex items-start gap-2"><span class="text-indigo-400">•</span><span>Documentation complète fournie</span></li>
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
