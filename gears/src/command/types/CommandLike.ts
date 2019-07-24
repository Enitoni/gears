import { Middleware } from "./Middleware"
import { Context } from "./Context"

/**
 * A [[Context]] and the [[Context]] at the point it was matched in a [[Chain]]
 */
export interface ChainEntry<M, C = unknown> {
  command: CommandLike<M, C>
  context: Context<{}, M, C>
}

/**
 * A chain of [[ChainEntry]] generated from a tree of [[CommandLike]]
 */
export type Chain<M, C = unknown> = ChainEntry<M, C>[]

/**
 * Represents either a [[CommandGroup]] or a [[Command]]
 * @category Command
 */
export interface CommandLike<M, C> {
  middleware: Middleware<{}, M, C>[]
  getChain: (context: Context<{}, M, C>) => Promise<Chain<M, C> | void>
}
