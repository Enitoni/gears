import { Matcher, Context } from "../types"

/**
 * Match if all matchers provided are satisfied
 * @example
 * matchAll(matchPrefixes("Gee,"), matchPrefixes("don't you just love prefixes"))
 *
 * // Matching: "Gee, don't you just love prefixes"
 * // Not matching: "Gee,"
 * @category Matching
 */
export const matchAll = (...matchers: Matcher[]): Matcher => async context => {
  let resultingContext: Context | void = context

  for (const matcher of matchers) {
    resultingContext = await matcher(resultingContext)
    if (!resultingContext) return
  }

  return resultingContext
}
