import { PromiseResolvable } from "../../core/types"

export type CommandAction<C, R = unknown> = (context: C) => PromiseResolvable<R>
