import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

/**
 * Determines if a [[CommandLike]] should run or not
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
