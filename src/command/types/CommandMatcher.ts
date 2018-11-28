import { PromiseResolvable } from "../../core/types"

export type CommandMatcher<C> = (context: C) => PromiseResolvable<C | undefined>
