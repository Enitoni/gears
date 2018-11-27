import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type CommandMatcher<C extends Context> = (
  context: C
) => PromiseResolvable<C | undefined>
