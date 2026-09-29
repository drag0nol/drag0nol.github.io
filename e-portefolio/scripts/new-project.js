// Usage : npm run new:project -- "Nom du projet"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const title = process.argv.slice(2).join(' ').trim()
if (!title) {
  console.error('Usage : npm run new:project -- "Nom du projet"')
  process.exit(1)
}

const slug = title
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const root = join(process.cwd(), 'src', 'content', 'projects')
const dir = join(root, slug)
if (existsSync(dir)) {
  console.error(`Le dossier existe déjà : ${dir}`)
  process.exit(1)
}

mkdirSync(dir, { recursive: true })
const model = JSON.parse(readFileSync(join(root, '_modele', 'project.json'), 'utf8'))
model.publie = true
model.title = title
model.header.title = title
model.order = 99
writeFileSync(join(dir, 'project.json'), JSON.stringify(model, null, 2) + '\n')

console.log(`Projet créé : src/content/projects/${slug}/project.json`)
console.log('1. Mets tes images (png, jpg, webp...) dans ce dossier')
console.log('2. Édite project.json')
console.log('3. npm run dev pour prévisualiser, npm run deploy pour publier')
