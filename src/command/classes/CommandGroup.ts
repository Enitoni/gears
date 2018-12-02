import { CommandLike, CommandMatcher, Context } from "../types"

export interface CommandGroupOptions<M, C, D> {
  matcher: CommandMatcher<unknown, M, C>
  commands: CommandLike<M, C>[]
  data?: D
}

export type CommandGroupContext<M, C> = Context<unknown, M, C>

export class CommandGroup<M, C, D = unknown> implements CommandLike<M, C> {
  private matcher: CommandMatcher<unknown, M, C>
  private privateCommands: CommandLike<M, C>[]

  constructor(options: CommandGroupOptions<M, C, D>) {
    const { matcher, commands } = options

    this.matcher = matcher
    this.privateCommands = commands
  }

  public async getMatch(testingContext: CommandGroupContext<M, C>) {
    const context = await this.matcher(testingContext)
    if (!context) return

    for (const command of this.privateCommands) {
      const result = await command.getMatch(context)
      if (result) return result
    }
  }

  get commands() {
    return [...this.privateCommands]
  }
}

export type CommandGroupClass<M, C, D = unknown> = new (
  options: CommandGroupOptions<M, C, D>
) => CommandGroup<M, C, D>
