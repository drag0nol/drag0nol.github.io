import { ref, computed } from 'vue'
import { supabase, supabaseEnabled } from '@/lib/supabase'
import {
  projects as staticProjects,
  rawProjects,
  formations as staticFormations,
  normalizeProject,
  resolverFor,
} from './index'

export const remoteRows = ref([])
export const remoteLoaded = ref(!supabaseEnabled)

export async function loadRemote() {
  if (!supabaseEnabled) return
  const { data, error } = await supabase.from('content').select('*').order('created_at')
  if (error) console.error('Chargement du contenu distant impossible :', error.message)
  else remoteRows.value = data
  remoteLoaded.value = true
}

const rowsOf = (kind) => remoteRows.value.filter((r) => r.kind === kind)

// Une ligne de la base avec le même slug qu'un projet du dépôt le remplace.
export const allProjects = computed(() => {
  const remote = rowsOf('project').map((r) => normalizeProject(r.data, r.slug, resolverFor(r.slug)))
  const overridden = new Set(remote.map((p) => p.slug))
  return [...staticProjects.filter((p) => !overridden.has(p.slug)), ...remote]
    .filter((p) => p.publie !== false)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
})

export const allFormations = computed(() => [
  ...staticFormations,
  ...rowsOf('formation').map((r) => r.data),
])

export const findProject = (slug) => allProjects.value.find((p) => p.slug === slug)

// Pour l'éditeur : tous les projets (dépôt + base), avec leur origine.
export const editableProjects = computed(() => {
  const rows = rowsOf('project')
  const bySlug = new Map(rows.map((r) => [r.slug, r]))
  const fromFiles = Object.entries(rawProjects).map(([slug, data]) => ({
    slug,
    data,
    row: bySlug.get(slug) || null,
    source: bySlug.has(slug) ? 'modifié' : 'fichier',
  }))
  const own = rows
    .filter((r) => !rawProjects[r.slug])
    .map((r) => ({ slug: r.slug, data: r.data, row: r, source: 'en ligne' }))
  return [...fromFiles.map((p) => (p.row ? { ...p, data: p.row.data } : p)), ...own]
})
