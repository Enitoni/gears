import { CommandMatcher, Context } from "../types"

export type RegExpResolvable = RegExp | (() => RegExp)
export type RegexContext = Context<{ match: RegExpExecArray }>

export const matchRegex = (
  regex: RegExpResolvable
): CommandMatcher<RegexContext> => async context => {
  const match = (typeof regex === "function" ? regex() : regex).exec(context.content)
  if (!match) return

  return { ...context, match }
}
