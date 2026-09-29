<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <div>
    <!-- Navigation Header -->
    <header class="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-md border-b border-indigo-500/20">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors" @click="closeMobileMenu">
            ETHANN
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex gap-6 xl:gap-8 items-center">
            <router-link 
              to="/" 
              :class="router.currentRoute.value.path === '/' ? 'text-indigo-400 underline' : 'text-slate-300 hover:text-indigo-400'"
              class="font-semibold transition-colors"
            >
              À propos
            </router-link>
            <router-link 
              to="/competences" 
              :class="router.currentRoute.value.path === '/competences' ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'"
              class="font-semibold transition-colors"
            >
              Compétences
            </router-link>
            <router-link 
              to="/experiences" 
              :class="router.currentRoute.value.path === '/experiences' ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'"
              class="font-semibold transition-colors"
            >
              Expériences
            </router-link>
            <router-link 
              to="/projects" 
              :class="router.currentRoute.value.path.startsWith('/projects') ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'"
              class="font-semibold transition-colors"
            >
              Projets
            </router-link>
            <router-link 
              to="/loisirs" 
              :class="router.currentRoute.value.path === '/loisirs' ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'"
              class="font-semibold transition-colors"
            >
              Loisirs
            </router-link>
            <router-link 
              to="/formation" 
              :class="router.currentRoute.value.path === '/formation' ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'"
              class="font-semibold transition-colors"
            >
              Ma formation
            </router-link>
            <router-link 
              to="/mes-atouts" 
              :class="router.currentRoute.value.path === '/mes-atouts' ? 'text-indigo-400' : 'text-slate-300 hover:text-indigo-400'"
              class="font-semibold transition-colors"
            >
              Mes atouts
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden text-slate-300 hover:text-indigo-400 transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div 
          v-if="mobileMenuOpen"
          class="lg:hidden mt-4 pb-4 border-t border-indigo-500/20 pt-4"
        >
          <div class="flex flex-col gap-3">
            <router-link 
              to="/" 
              @click="closeMobileMenu"
              :class="router.currentRoute.value.path === '/' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50'"
              class="font-semibold transition-colors px-4 py-3 rounded-lg"
            >
              À propos
            </router-link>
            <router-link 
              to="/competences" 
              @click="closeMobileMenu"
              :class="router.currentRoute.value.path === '/competences' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50'"
              class="font-semibold transition-colors px-4 py-3 rounded-lg"
            >
              Compétences
            </router-link>
            <router-link 
              to="/experiences" 
              @click="closeMobileMenu"
              :class="router.currentRoute.value.path === '/experiences' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50'"
              class="font-semibold transition-colors px-4 py-3 rounded-lg"
            >
              Expériences
            </router-link>
            <router-link 
              to="/projects" 
              @click="closeMobileMenu"
              :class="router.currentRoute.value.path.startsWith('/projects') ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50'"
              class="font-semibold transition-colors px-4 py-3 rounded-lg"
            >
              Projets
            </router-link>
            <router-link 
              to="/loisirs" 
              @click="closeMobileMenu"
              :class="router.currentRoute.value.path === '/loisirs' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50'"
              class="font-semibold transition-colors px-4 py-3 rounded-lg"
            >
              Loisirs
            </router-link>
            <router-link 
              to="/formation" 
              @click="closeMobileMenu"
              :class="router.currentRoute.value.path === '/formation' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50'"
              class="font-semibold transition-colors px-4 py-3 rounded-lg"
            >
              Ma formation
            </router-link>
            <router-link 
              to="/mes-atouts" 
              @click="closeMobileMenu"
              :class="router.currentRoute.value.path === '/mes-atouts' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-700/50'"
              class="font-semibold transition-colors px-4 py-3 rounded-lg"
            >
              Mes atouts
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Router View -->
    <router-view />
  </div>
</template>

<style scoped>
</style>
