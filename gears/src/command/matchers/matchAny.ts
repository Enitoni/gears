import { Matcher } from "../types"

/**
 * Matches the first satisfied matcher
 * @example
 * matchAny(matchRegex(/[Hh]ey!/), matchPrefixes("hi"))
 *
 * // Matching: "hey!"
 * // Matching: "hi"
 * // Matching: "Hey!"
 * // Not matching: "hello"
 * @category Matching
 */
export const matchAny = (
  ...matchers: Matcher<any, any, any>[]
): Matcher => async context => {
  for (const matcher of matchers) {
    const result = await matcher(context)
    if (result) return result
  }

  return
}
