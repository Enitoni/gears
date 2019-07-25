import { Matcher } from "../types"

/**
 * Match when the message starts with any of the provided keywords.
 * Removes the matching keyword from the [[Context]] content
 * @example
 * matchPrefixes("Hi", "Hello", "Hola")
 *
 * // Matching: "Hi"
 * // Matching: "Hello"
 * // Matching: "Hola"
 * // Not matching: "Goodbye"
 * @category Matching
 */
export const matchPrefixes = (...keywords: string[]): Matcher => async context => {
  const escaped = keywords.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const regex = new RegExp(`^(${escaped.join("|")})`, "i")

  const isMatching = !!context.content.match(regex)
  if (!isMatching) return

  const newContent = context.content.replace(regex, "").trim()
  return { ...context, content: newContent }
}
