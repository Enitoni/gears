import {
  CommandAction,
  CommandLike,
  CommandMatcher,
  Context,
  MatchResult
} from "../types"

export interface CommandOptions<M, C, D> {
  matcher: CommandMatcher<unknown, M, C>
  action: CommandAction<Context<unknown, M, C>>
  data?: D
}

export type CommandContext<M, C> = Context<unknown, M, C>

export class Command<M, C, D = unknown> implements CommandLike<M, C> {
  public data?: D
  private matcher: CommandMatcher<unknown, M, C>
  private action: CommandAction<CommandContext<M, C>>

  constructor(options: CommandOptions<M, C, D>) {
    const { matcher, action, data } = options

    this.matcher = matcher
    this.action = action
    this.data = data
  }

  public async getMatch(
    testingContext: CommandContext<M, C>
  ): Promise<MatchResult<M, C> | undefined> {
    const context = await this.matcher(testingContext)
    if (!context) return

    return {
      command: this,
      context
    }
  }

  public async run(context: CommandContext<M, C>) {
    return this.action(context)
  }
}

export type CommandClass<M, C, D = unknown> = new (
  options: CommandOptions<M, C, D>
) => Command<M, C, D>
