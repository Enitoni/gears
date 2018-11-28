import { CommandMatcher } from "../types"

export const matchNone = (
  matchers: CommandMatcher[]
): CommandMatcher => async context => {
  for (const matcher of matchers) {
    const newContext = await matcher(context)
    if (newContext) return
  }

  return context
}
