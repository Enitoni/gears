import { CommandMatcher } from "../types"

export type RegExpResolvable = RegExp | (() => RegExp)

export interface RegexData {
  match: RegExpExecArray
}

export const matchRegex = (
  regex: RegExpResolvable
): CommandMatcher<RegexData> => async context => {
  const match = (typeof regex === "function" ? regex() : regex).exec(context.content)
  if (!match) return

  return { ...context, match }
}
