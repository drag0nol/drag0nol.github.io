import formationsData from './formations.json'

const projectFiles = import.meta.glob('./projects/*/project.json', { eager: true, import: 'default' })
const imageFiles = import.meta.glob('./projects/*/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const toList = (v) => (Array.isArray(v) ? v : v ? [v] : [])
const isUrl = (s) => /^(https?:)?\/\//.test(s)

// Met en forme un project.json (fichier ou base de données) pour l'affichage.
// `resolve(file)` transforme un nom de fichier en URL d'image.
export function normalizeProject(data, slug, resolve = () => undefined) {
  const image = (file) => (file && isUrl(file) ? file : resolve(file))
  return {
    order: 0,
    status: '',
    tags: [],
    meta: [],
    links: [],
    ...data,
    slug,
    cover: image(data.cover),
    sections: toList(data.sections).map((s) => ({
      ...s,
      text: toList(s.text),
      bullets: toList(s.bullets),
      images: toList(s.images)
        .map((i) => (typeof i === 'string' ? { file: i } : i))
        .map((i) => ({ ...i, file: i.file || i.url, src: i.url || image(i.file) }))
        .filter((i) => i.src),
    })),
  }
}

export const formations = formationsData

export const projects = Object.entries(projectFiles).map(([path, data]) => {
  const slug = path.split('/')[2]
  const resolve = (file) => imageFiles[`./projects/${slug}/${file}`]
  const project = normalizeProject(data, slug, resolve)
  if (!project.cover) {
    const first = Object.keys(imageFiles)
      .filter((p) => p.startsWith(`./projects/${slug}/`))
      .sort()[0]
    project.cover = first && imageFiles[first]
  }
  return project
})
