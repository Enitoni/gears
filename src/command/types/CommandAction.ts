import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type CommandAction<C extends Context, R = unknown> = (
  context: C
) => PromiseResolvable<R>
