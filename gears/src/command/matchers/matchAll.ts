import { Matcher, Context } from "../types"

/**
 * Match all matchers
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
