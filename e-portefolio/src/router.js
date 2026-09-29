import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Experiences from './pages/Experiences.vue'
import Loisirs from './pages/Loisirs.vue'
import SoftSkills from './pages/SoftSkills.vue'
import Formation from './pages/Formation.vue'
import Competences from './pages/Competences.vue'
import Projects from './pages/Projects.vue'
import ProjectDynamic from './pages/ProjectDynamic.vue'
import Admin from './pages/Admin.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/experiences', component: Experiences, name: 'Experiences' },
  { path: '/loisirs', component: Loisirs, name: 'Loisirs' },
  { path: '/competences', component: Competences, name: 'Competences' },
  { path: '/mes-atouts', component: SoftSkills, name: 'MesAtouts' },
  { path: '/formation', component: Formation, name: 'Formation' },
  { path: '/projects', component: Projects, name: 'Projects' },
  { path: '/admin', component: Admin, name: 'Admin' },
  { path: '/projects/:slug', component: ProjectDynamic, name: 'ProjectDynamic' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
