export const categorize = <T>(arr: T[], fn: (item: T) => string) => {
  const map: Record<string, T[]> = {}

  for (const item of arr) {
    const category = fn(item)
    const items = (map[category] = map[category] || [])

    items.push(item)
  }

  return map
}
