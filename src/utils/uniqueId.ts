const idCounter = {}

export function uniqueId(prefix: string = '$uniqueId$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  const id = ++idCounter[prefix];

  if (prefix === '$uniqueId$') {
    return `${id}`
  }

  return `${prefix + id}`
}
