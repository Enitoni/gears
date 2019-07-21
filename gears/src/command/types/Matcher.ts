import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

/**
 * Determines if a [[CommandLike]] should run or not
 * @category Matching
 */
export type Matcher<D = any, M = any, C = any> = (
  context: Context<{}, M, C>
) => PromiseResolvable<Context<D, M, C> | void>
