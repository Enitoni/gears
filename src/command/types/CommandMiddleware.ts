import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type NextFunction<R> = () => Promise<R>

export type BaseMiddleware<C = Context, R = unknown> = (
  context: C,
  next: NextFunction<R>
) => PromiseResolvable<R> | undefined | void

export type Middleware<D = unknown, M = any, C = any> = BaseMiddleware<Context<D, M, C>>
