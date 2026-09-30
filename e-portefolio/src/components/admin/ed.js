// Petites fonctions communes aux éditeurs.
export const clone = (o) => JSON.parse(JSON.stringify(o))

// Échange l'élément i avec son voisin (d = -1 : vers le haut, +1 : vers le bas).
export function move(list, i, d) {
  const j = i + d
  if (j < 0 || j >= list.length) return
  ;[list[i], list[j]] = [list[j], list[i]]
}

export const duplicate = (list, i) => list.splice(i + 1, 0, clone(list[i]))

export const remove = (list, i) => list.splice(i, 1)
