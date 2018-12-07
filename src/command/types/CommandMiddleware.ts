import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type NextFunction<R> = () => Promise<R>

export type BaseMiddleware<D = unknown, M = unknown, C = unknown, R = unknown> = (
  context: Context<D, M, C>,
  next: NextFunction<R>
) => PromiseResolvable<R> | undefined | void

export type Middleware<D = unknown, M = any, C = any> = BaseMiddleware<D, M, C>
