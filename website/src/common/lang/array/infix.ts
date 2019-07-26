export const infix = <T, U>(arr: T[], divider: U | ((i: number) => U)): (T | U)[] => {
  return arr
    .map((x, i) => [x, typeof divider === "function" ? (divider as any)(i) : divider])
    .flat()
    .slice(0, -1)
}

export const infixComma = <T>(arr: T[]) => infix(arr, ", ")
