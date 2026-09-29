import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const distDir = join(process.cwd(), 'dist')
const indexPath = join(distDir, 'index.html')
const fallbackPath = join(distDir, '404.html')

if (!existsSync(distDir)) {
  console.error('dist folder not found. Run "npm run build" first.')
  process.exit(1)
}

copyFileSync(indexPath, fallbackPath)
console.log('Created 404.html for SPA fallback')
