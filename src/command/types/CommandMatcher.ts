import { PromiseResolvable } from "../../core/types"
import { Context } from "./Context"

export type CommandMatcher<C = Context> = (context: C) => PromiseResolvable<C | void>
