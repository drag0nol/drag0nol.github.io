import { ref, computed } from 'vue'
import { supabase, supabaseEnabled } from '@/lib/supabase'
import { projects as staticProjects, formations as staticFormations, normalizeProject } from './index'

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

export const allProjects = computed(() =>
  [...staticProjects, ...rowsOf('project').map((r) => normalizeProject(r.data, r.slug))]
    .filter((p) => p.publie !== false)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
)

export const allFormations = computed(() => [
  ...staticFormations,
  ...rowsOf('formation').map((r) => r.data),
])

export const findProject = (slug) => allProjects.value.find((p) => p.slug === slug)
