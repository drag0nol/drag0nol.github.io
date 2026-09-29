const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Texte enrichi minimal : **gras**. Tout le reste est échappé.
export function rich(s, boldClass = '') {
  const cls = boldClass ? ` class="${boldClass}"` : ''
  return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, `<strong${cls}>$1</strong>`)
}
