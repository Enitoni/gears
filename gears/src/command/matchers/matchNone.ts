import { CommandMatcher } from "../types"

/**
 * Match if no matchers provided match
 * @category Matching
 */
export const matchNone = (
  ...matchers: CommandMatcher[]
): CommandMatcher => async context => {
  for (const matcher of matchers) {
    const newContext = await matcher(context)
    if (newContext) return
  }

  return context
}
