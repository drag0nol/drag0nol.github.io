<script setup>
import { ref } from 'vue'
import { competences } from '@/content/remote'

const expandedUE = ref([])
const closedSections = ref([])

const toggle = (list, id) => {
  const i = list.indexOf(id)
  if (i > -1) list.splice(i, 1)
  else list.push(id)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

    <div class="relative z-10">
      <header class="pt-12 pb-8 max-w-6xl mx-auto px-6 flex flex-col items-center">
        <h1 class="text-4xl font-bold text-white mb-2">{{ competences.title }}</h1>
        <p v-if="competences.subtitle" class="text-indigo-300 text-lg mb-4">{{ competences.subtitle }}</p>
      </header>

      <main class="max-w-6xl mx-auto px-6 py-12">
        <div class="mb-12">
          <h2 v-if="competences.heading" class="text-3xl font-bold text-white mb-12 text-center">{{ competences.heading }}</h2>
          <p v-if="competences.intro" class="text-slate-300 text-center mb-8">{{ competences.intro }}</p>

          <!-- Un cadre par formation (BUT Informatique, Bachelor, Master...) -->
          <section
            v-for="(sec, si) in competences.sections"
            :key="si"
            class="mb-10 rounded-[2rem] border border-indigo-500/30 bg-slate-900/40 p-6 md:p-8"
          >
            <div
              class="flex items-center justify-between cursor-pointer rounded-xl p-2 -m-2 hover:bg-indigo-500/10 transition-colors"
              @click="toggle(closedSections, si)"
            >
              <div class="flex-1">
                <h2 class="text-3xl font-bold text-white">{{ sec.title }}</h2>
                <p v-if="sec.subtitle" class="text-indigo-300 mt-1">{{ sec.subtitle }}</p>
              </div>
              <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: closedSections.includes(si) ? 'rotate(0deg)' : 'rotate(180deg)' }">▼</div>
            </div>

            <div v-if="!closedSections.includes(si)" class="grid grid-cols-1 gap-6 mt-6">
              <div
                v-for="(ue, ui) in sec.ues"
                :key="ui"
                class="bg-gradient-to-r from-indigo-500/20 to-slate-700/20 rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-400 transition-all"
              >
                <div class="flex items-center justify-between cursor-pointer hover:bg-indigo-500/10 rounded-xl p-2 -m-2 transition-colors" @click="toggle(expandedUE, si + '-' + ui)">
                  <div class="flex-1">
                    <h3 class="text-2xl font-extrabold text-indigo-200 mb-2">{{ ue.title }}</h3>
                    <p v-if="ue.description" class="text-slate-300 text-sm mb-2">{{ ue.description }}</p>
                  </div>
                  <div class="text-3xl text-indigo-400 transition-transform" :style="{ transform: expandedUE.includes(si + '-' + ui) ? 'rotate(180deg)' : 'rotate(0deg)' }">▼</div>
                </div>
                <div v-if="expandedUE.includes(si + '-' + ui)" class="mt-4 pt-4 border-t border-indigo-500/30" @click.stop>
                  <template v-for="(lv, li) in ue.levels" :key="li">
                    <p :class="li ? 'mt-4' : ''" class="text-indigo-300 text-lg mb-3 italic font-bold">{{ lv.title }}</p>
                    <ul class="text-slate-300 text-sm space-y-2">
                      <li v-for="(it, ii) in lv.items" :key="ii" :class="it.links && it.links.length ? 'flex items-center justify-between' : ''">
                        <span>• {{ it.text }}</span>
                        <div v-if="it.links && it.links.length" class="flex gap-1">
                          <router-link
                            v-for="(l, k) in it.links"
                            :key="k"
                            :to="l.to"
                            class="ml-2 px-2 py-1 bg-indigo-600/50 hover:bg-indigo-600 text-indigo-100 text-xs rounded transition-colors whitespace-nowrap"
                          >{{ l.label }} →</router-link>
                        </div>
                      </li>
                    </ul>
                  </template>
                </div>
              </div>
            </div>
          </section>
        </div>

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
