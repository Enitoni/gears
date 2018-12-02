import { Command } from "../classes"
import { Context } from "./Context"

export interface MatchResult<M, C = unknown> {
  command: Command<M, C, any>
  context: Context<unknown, M, C>
}

export interface CommandLike<M, C> {
  getMatch: (context: Context<unknown, M, C>) => Promise<MatchResult<M, C> | void>
}
