import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

/**
 * The next [[Middleware]]
 * @category Middleware
 */
export type NextFunction<R> = () => Promise<R>

/**
 * Called when a command's middleware is executed.
 * @param context The [[Chain]] from the [[ChainEntry]]
 * @param next The next middleware
 * @category Middleware
 */
export type Middleware<D = {}, M = any, C = any, R = any> = (
  context: Context<D, M, C>,
  next: NextFunction<R>
) => PromiseResolvable<R> | undefined | void
