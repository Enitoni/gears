import { Command } from "../classes"
import { Context } from "./Context"

export interface MatchResult<C extends Context> {
  command: Command<C>
  context: C
}

export interface CommandLike<C extends Context> {
  getMatch: (context: C) => Promise<MatchResult<C> | undefined>
}
