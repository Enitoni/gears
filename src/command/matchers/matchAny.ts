import { CommandMatcher } from "../types"

export const matchAny = (
  ...matchers: CommandMatcher[]
): CommandMatcher => async context => {
  for (const matcher of matchers) {
    const result = await matcher(context)
    if (result) return result
  }

  return
}
