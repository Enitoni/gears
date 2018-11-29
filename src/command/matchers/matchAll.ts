import { CommandMatcher, Context } from "../types"

export const matchAll = (
  ...matchers: CommandMatcher[]
): CommandMatcher => async context => {
  let resultingContext: Context | void = context

  for (const matcher of matchers) {
    resultingContext = await matcher(resultingContext)
    if (!resultingContext) return
  }

  return resultingContext
}
