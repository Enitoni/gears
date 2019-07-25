import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

/**
 * The next [[Middleware]]
 * @template R Response
 * @category Middleware
 */
export type NextFunction<R> = () => Promise<R>

/**
 * Middleware runs sequentially down the tree
 * It allows you to attach state or perform actions within a [[CommandLike]]
 * @example
 * const loggerMiddleware = async (context, next) => {
 *   const result = await next()
 *
 *   console.log(`Middleware returned ${result}`)
 * }
 *
 * const nextMiddleware = (context) => {
 *   return context.content.toUpperCase()
 * }
 *
 * // Input: "This is a message."
 * // Output: "Middleware returned THIS IS A MESSAGE."
 * @template S State
 * @template M Message
 * @template C Client
 * @template R Response
 * @param context The [[Chain]] from the [[ChainEntry]]
 * @param next The next middleware
 * @category Middleware
 */
export type Middleware<S = {}, M = any, C = any, R = any> = (
  context: Context<S, M, C>,
  next: NextFunction<R>
) => PromiseResolvable<R> | undefined | void
