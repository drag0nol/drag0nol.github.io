export const BULLETS = { dot: '•', arrow: '▸', square: '▫️' }

export const TONES = {
  indigo: {
    box: 'from-indigo-500/20 to-slate-700/20 border-indigo-500/30',
    title: 'text-indigo-200',
    bold: 'text-indigo-300',
  },
  amber: {
    box: 'from-amber-500/20 to-slate-700/20 border-amber-500/30',
    title: 'text-amber-200',
    bold: 'text-amber-300',
  },
}
export const tone = (t) => TONES[t] || TONES.indigo

export const bulletOf = (c) => (c.bullet === 'none' ? '' : BULLETS[c.bullet] ?? BULLETS.dot)
