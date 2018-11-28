import { Command } from "../classes"
import { UnknownBaseContext } from "./Context"

export interface MatchResult<C extends UnknownBaseContext> {
  command: Command<C>
  context: C
}

export interface CommandLike<C extends UnknownBaseContext> {
  getMatch: (context: C) => Promise<MatchResult<C> | undefined>
}
