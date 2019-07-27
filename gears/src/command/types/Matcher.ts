import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

/**
 * Determines if a [[CommandLike]] should run or not.
 * When it is called, it is passed the [[Context]] which is then returned if the matcher is satisfied
 * @example
 * // Custom matcher
 * const matchLength = (length: number) => (context) => {
 *   const { content } = context
 *
 *   if (content.length >= length) {
 *     return context
 *   }
 * }
 *
 * matchLength(3)
 *
 * // Matching: "This is a message"
 * // Not matching: "Hi"
 * @template S State
 * @template M Message
 * @template C Client
 * @category Matching
 */
export type Matcher<S = any, M = any, C = any> = (
  context: Context<{}, M, C>
) => PromiseResolvable<Context<S, M, C> | void>
