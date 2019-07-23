export const ensureValue = <T>(value: T | undefined | null) => {
  if (!value) throw new Error("Failed to ensure value")
  return value
}
