import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Experiences from './pages/Experiences.vue'
import Loisirs from './pages/Loisirs.vue'
import SoftSkills from './pages/SoftSkills.vue'
import Formation from './pages/Formation.vue'
import Competences from './pages/Competences.vue'
import Projects from './pages/Projects.vue'
import ProjectStarbound from './pages/ProjectStarbound.vue'
import ProjectSavoy from './pages/ProjectSavoy.vue'
import ProjectHunter from './pages/ProjectHunter.vue'
import ProjectCaspino from './pages/ProjectCaspino.vue'
import ProjectMarathon from './pages/ProjectMarathon.vue'
import ProjectVM from './pages/ProjectVM.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/experiences', component: Experiences, name: 'Experiences' },
  { path: '/loisirs', component: Loisirs, name: 'Loisirs' },
  { path: '/competences', component: Competences, name: 'Competences' },
  { path: '/mes-atouts', component: SoftSkills, name: 'MesAtouts' },
  { path: '/formation', component: Formation, name: 'Formation' },
  { path: '/projects', component: Projects, name: 'Projects' },
  { path: '/projects/starbound-legacy', component: ProjectStarbound, name: 'ProjectStarbound' },
  { path: '/projects/savoy-sidesktop', component: ProjectSavoy, name: 'ProjectSavoy' },
  { path: '/projects/hunter', component: ProjectHunter, name: 'ProjectHunter' },
  { path: '/projects/caspino', component: ProjectCaspino, name: 'ProjectCaspino' },
  { path: '/projects/marathon-beaune', component: ProjectMarathon, name: 'ProjectMarathon' },
  { path: '/projects/vm-developpement', component: ProjectVM, name: 'ProjectVM' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
