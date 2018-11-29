import { Context, MatchResult } from "../types"

export class CommandError<M> extends Error {
  name = "CommandError"
  public match: MatchResult<Context<unknown, M>>

  constructor(match: MatchResult<Context<unknown, M>>, error: any) {
    super(error.message || error)
    this.match = match
  }
}
