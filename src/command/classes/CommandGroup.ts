import { CommandLike, CommandMatcher, Context } from "../types"

export interface CommandGroupOptions<C extends Context, D = unknown> {
  matcher: CommandMatcher<C>
  commands: CommandLike<C>[]
  data?: D
}

export class CommandGroup<C extends Context, D extends object = {}>
  implements CommandLike<C> {
  private matcher: CommandMatcher<C>
  private privateCommands: CommandLike<C>[]

  constructor(options: CommandGroupOptions<C, D>) {
    const { matcher, commands } = options

    this.matcher = matcher
    this.privateCommands = commands
  }

  public async getMatch(testingContext: C) {
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

export type CommandGroupClass<C extends Context, D extends object = {}> = new (
  options: CommandGroupOptions<C, D>
) => CommandGroup<C, D>
