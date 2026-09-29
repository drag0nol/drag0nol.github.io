import formationsData from './formations.json'

const projectFiles = import.meta.glob('./projects/*/project.json', { eager: true, import: 'default' })
const imageFiles = import.meta.glob('./projects/*/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const toList = (v) => (Array.isArray(v) ? v : v ? [v] : [])

export const formations = formationsData

export const projects = Object.entries(projectFiles)
  .map(([path, data]) => {
    const slug = path.split('/')[2]
    const image = (file) => imageFiles[`./projects/${slug}/${file}`]
    const images = Object.keys(imageFiles)
      .filter((p) => p.startsWith(`./projects/${slug}/`))
      .sort()
      .map((p) => imageFiles[p])

    return {
      order: 0,
      status: '',
      tags: [],
      meta: [],
      links: [],
      ...data,
      slug,
      cover: data.cover ? image(data.cover) : images[0],
      sections: toList(data.sections).map((s) => ({
        ...s,
        text: toList(s.text),
        bullets: toList(s.bullets),
        images: toList(s.images)
          .map((i) => (typeof i === 'string' ? { file: i } : i))
          .map((i) => ({ ...i, src: image(i.file) }))
          .filter((i) => i.src),
      })),
    }
  })
  .filter((p) => p.publie !== false)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

export const getProject = (slug) => projects.find((p) => p.slug === slug)
