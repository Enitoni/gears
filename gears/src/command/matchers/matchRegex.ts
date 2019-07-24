import { Matcher } from "../types"

/**
 * Can be RegExp or () => RegExp
 * @category Internal
 */
export type RegExpResolvable = RegExp | (() => RegExp)

/**
 * @ignore
 */
export interface RegexData {
  match: RegExpExecArray
}

/**
 * Match when the provided regular expression matches, adds match array to context state.
 * @category Matching
 */
export const matchRegex = (
  regex: RegExpResolvable
): Matcher<RegexData> => async context => {
  const match = (typeof regex === "function" ? regex() : regex).exec(context.content)
  if (!match) return

  return { ...context, state: { match } }
}
