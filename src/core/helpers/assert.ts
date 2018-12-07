export class AssertionError extends Error {}
export const assert = (condition: boolean, message: string) =>
  condition ? undefined : new AssertionError(message)
