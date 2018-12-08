import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type CommandMatcher<D = {}, M = any, C = any> = (
  context: Context<{}, M, C>
) => PromiseResolvable<Context<D, M, C> | void>
