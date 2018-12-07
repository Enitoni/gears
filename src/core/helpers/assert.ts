export class AssertionError extends Error {}
export const assert = (condition: boolean, message: string) => {
  if (condition) throw new AssertionError(message)
}
