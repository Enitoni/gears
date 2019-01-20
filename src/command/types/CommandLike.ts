import { Middleware } from "./CommandMiddleware"
import { Context } from "./Context"

export interface ChainEntry<M, C = unknown> {
  command: CommandLike<M, C>
  context: Context<{}, M, C>
}

export type Chain<M, C = unknown> = ChainEntry<M, C>[]

export interface CommandLike<M, C> {
  middleware: Middleware<{}, M, C>[]
  getChain: (context: Context<{}, M, C>) => Promise<Chain<M, C> | void>
  //run: (context: Context<unknown, M, C>, match?: Middleware) => Promise<any>
}
