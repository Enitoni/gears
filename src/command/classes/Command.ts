import {
  CommandAction,
  CommandLike,
  CommandMatcher,
  Context,
  MatchResult
} from "../types"

export interface CommandOptions<C extends Context, D> {
  matcher: CommandMatcher<C>
  action: CommandAction<C>
  data?: D
}

export class Command<C extends Context, D extends object = {}> implements CommandLike<C> {
  private matcher: CommandMatcher<C>
  private action: CommandAction<C>

  constructor(options: CommandOptions<C, D>) {
    const { matcher, action } = options

    this.matcher = matcher
    this.action = action
  }

  public async getMatch(testingContext: C): Promise<MatchResult<C> | undefined> {
    const context = await this.matcher(testingContext)

    if (!context) return undefined

    return {
      command: this,
      context
    }
  }

  public async run(context: C) {
    return this.action(context)
  }
}
