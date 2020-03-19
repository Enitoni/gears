import { Middleware } from "./Middleware"
import { Context } from "./Context"

/**
 * A [[CommandLike]] and the [[Context]] at the point it was matched in a [[Chain]]
 * @category Internal
 */
export interface ChainEntry<M, C = unknown> {
  chainer: MiddlewareChainer<M, C>
  context: Context<{}, M, C>
}

/**
 * A chain of [[ChainEntry]] generated from a tree of [[CommandLike]] during message processing
 * @category Internal
 */
export type Chain<M, C = unknown> = ChainEntry<M, C>[]

/**
 * Represents logic that can chain middleware
 * @category Internal
 */
export interface MiddlewareChainer<M, C> {
  middleware: Middleware<{}, M, C>[]
  getChain: (context: Context<{}, M, C>) => Promise<Chain<M, C> | void>
}
