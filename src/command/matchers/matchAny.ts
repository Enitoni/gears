import { CommandMatcher } from "../types"

/**
 * Match the first matching matcher
 * @category Matching
 */
export const matchAny = (
  ...matchers: CommandMatcher[]
): CommandMatcher => async context => {
  for (const matcher of matchers) {
    const result = await matcher(context)
    if (result) return result
  }

  return
}
