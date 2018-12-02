import { MatchResult } from "../types"

export class CommandError<M, C> extends Error {
  name = "CommandError"
  public match: MatchResult<M, C>

  constructor(match: MatchResult<M, C>, error: any) {
    super(error.message || error)
    this.match = match
  }
}
