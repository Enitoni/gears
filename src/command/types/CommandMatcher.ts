import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type CommandMatcher<D = any, M = any, C = any> = (
  context: Context<unknown, M, C>
) => PromiseResolvable<Context<D, M, C> | void>
