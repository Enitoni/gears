import { Command } from "../classes/Command"
import { Context } from "./Context"

export interface MatchResult<C extends Context> {
  command: Command<C>
  context: Context
}

export interface CommandLike<C extends Context> {
  getMatch: (context: C) => Promise<MatchResult<C> | undefined>
}
