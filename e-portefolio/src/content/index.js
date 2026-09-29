import formationsData from './formations.json'

const projectFiles = import.meta.glob('./projects/*/project.json', { eager: true, import: 'default' })
const imageFiles = import.meta.glob('./projects/*/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const toList = (v) => (Array.isArray(v) ? v : v ? [v] : [])
const isUrl = (s) => /^(https?:)?\/\//.test(s)

// Anciens projets (sections simples title/text/bullets/images) -> blocs
function legacyBlocks(s) {
  const blocks = []
  if (toList(s.text).length || toList(s.bullets).length) {
    blocks.push({ type: 'callout', paragraphs: toList(s.text), items: toList(s.bullets) })
  }
  if (toList(s.images).length) blocks.push({ type: 'image', images: toList(s.images) })
  return blocks
}

// Ramène n'importe quelle version d'un project.json au format actuel (header + sections[].blocks).
export function upgradeLegacy(data) {
  const header = data.header || {
    kicker: data.category,
    title: data.title,
    subtitle: data.subtitle,
    facts: toList(data.meta).map((text) => ({ text })),
  }
  return {
    ...data,
    header: { facts: [], ...header, title: header.title || data.title },
    sections: toList(data.sections).map((s) => ({ title: s.title, blocks: s.blocks || legacyBlocks(s) })),
  }
}

// Fichiers d'images d'un projet du dépôt : nom de fichier -> URL
// Un nom contenant "/" désigne un autre projet du dépôt (ex. "starbound-legacy/shop.png").
export const resolverFor = (slug) => (file) =>
  imageFiles[`./projects/${String(file).includes('/') ? file : `${slug}/${file}`}`]

// Met en forme un project.json (fichier ou base de données) pour l'affichage.
// `resolve(file)` transforme un nom de fichier en URL d'image.
export function normalizeProject(data, slug, resolve = () => undefined) {
  const image = (file) => (file && isUrl(file) ? file : resolve(file))
  const normImages = (list) =>
    toList(list)
      .map((i) => (typeof i === 'string' ? { file: i } : i))
      .map((i) => ({ ...i, file: i.file || i.url, src: i.url || image(i.file) }))
      .filter((i) => i.src)

  const up = upgradeLegacy(data)
  return {
    order: 0,
    status: '',
    tone: 'indigo',
    tags: [],
    links: [],
    ...up,
    slug,
    cover: image(up.cover),
    sections: up.sections.map((s) => ({
      ...s,
      blocks: s.blocks.map((b) => {
        if (b.type === 'image') return { ...b, images: normImages(b.images) }
        if (b.type === 'carousel') {
          return {
            ...b,
            slides: toList(b.slides)
              .map((sl) => (sl.type === 'image' ? { ...sl, src: sl.url || image(sl.file) } : sl))
              .filter((sl) => sl.type !== 'image' || sl.src),
          }
        }
        return b
      }),
    })),
  }
}

export const formations = formationsData

export const rawProjects = Object.fromEntries(
  Object.entries(projectFiles).map(([path, data]) => [path.split('/')[2], data]),
)

export const projects = Object.entries(rawProjects).map(([slug, data]) => {
  const project = normalizeProject(data, slug, resolverFor(slug))
  if (!project.cover) {
    const first = Object.keys(imageFiles)
      .filter((p) => p.startsWith(`./projects/${slug}/`))
      .sort()[0]
    project.cover = first && imageFiles[first]
  }
  return project
})
