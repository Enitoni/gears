export const infix = <T, U>(arr: T[], divider: U) => {
  return arr
    .map(x => [x, divider])
    .flat()
    .slice(0, -1)
}

export const infixComma = <T>(arr: T[]) => infix(arr, ", ")
