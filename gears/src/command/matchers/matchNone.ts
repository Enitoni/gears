import { Matcher } from "../types"

/**
 * Match if no matchers provided are satisfied
 * @example
 * matchNone(matchPrefixes("Let me in!"))
 *
 * // Matching: "Please let me in."
 * // Not matching: "Let me in!"
 * @category Matching
 */
export const matchNone = (...matchers: Matcher[]): Matcher => async context => {
  for (const matcher of matchers) {
    const newContext = await matcher(context)
    if (newContext) return
  }

  return context
}
