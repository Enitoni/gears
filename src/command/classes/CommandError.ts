import { Context, MatchResult } from "../types"

export class CommandError<M> extends Error {
  public match: MatchResult<Context<unknown, M>>

  constructor(match: MatchResult<Context<unknown, M>>, error: any) {
    super(error)
    this.match = match
  }
}
