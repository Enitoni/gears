import { Middleware } from "./CommandMiddleware"
import { Context } from "./Context"

export interface Chain<M, C = unknown> {
  commands: CommandLike<M, C>[]
  context: Context<{}, M, C>
}

export interface CommandLike<M, C> {
  middleware: Middleware<{}, M, C>[]
  getChain: (context: Context<{}, M, C>) => Promise<Chain<M, C> | void>
  //run: (context: Context<unknown, M, C>, match?: Middleware) => Promise<any>
}
