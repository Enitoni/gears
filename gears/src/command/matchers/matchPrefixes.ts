import { CommandMatcher } from "../types"

/**
 * Match when the command starts with any of the provided keywords
 * Removes the matching keyword from the [[Context]] content
 * @category Matching
 */
export const matchPrefixes = (...keywords: string[]): CommandMatcher => async context => {
  const escaped = keywords.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const regex = new RegExp(`^(${escaped.join("|")})`, "i")

  const isMatching = !!context.content.match(regex)
  if (!isMatching) return

  const newContent = context.content.replace(regex, "").trim()
  return { ...context, content: newContent }
}
