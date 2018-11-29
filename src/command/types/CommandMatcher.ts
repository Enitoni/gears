import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type CommandMatcher<C = Context> = (
  context: Context
) => PromiseResolvable<C | void>
