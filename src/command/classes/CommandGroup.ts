import { ArrayResolvable } from "../../core"
import { resolveToArray } from "../../core/helpers"
import { composeMiddleware } from "../helpers"
import {
  BaseContext,
  Chain,
  CommandLike,
  CommandMatcher,
  Context,
  Middleware
} from "../types"
import { Command } from "./Command"

export interface CommandGroupOptions<M, C, D> {
  matcher: CommandMatcher<unknown, M, C>
  commands: CommandLike<M, C>[]
  middleware?: ArrayResolvable<Middleware<unknown, M, C>>
  data?: D
}

export class CommandGroup<M, C, D = unknown> implements CommandLike<M, C> {
  public data?: D
  public middleware: Middleware<unknown, M, C>[]
  public commands: CommandLike<M, C>[]
  private matcher: CommandMatcher<unknown, M, C>

  constructor(options: CommandGroupOptions<M, C, D>) {
    const { data, matcher, commands, middleware = [] } = options

    this.data = data
    this.matcher = matcher
    this.commands = commands
    this.middleware = resolveToArray(middleware)
  }

  public async getChain(context: BaseContext<M, C>): Promise<Chain<M, C> | void> {
    const newContext: Context<unknown, M, C> = { ...context, issuer: this }
    const resultContext = await this.matcher(newContext)

    if (!resultContext) return

    for (const command of this.commands) {
      const chain = await command.getChain(resultContext)

      if (chain)
        return {
          commands: [this, ...chain.commands],
          context: chain.context
        }
    }
  }

  public async run(
    context: Context<unknown, M, C>,
    command: Command<M, C> | CommandGroup<M, C>
  ) {
    context.issuer = this

    const middleware: Middleware[] = [
      ...this.middleware,
      context => {
        if (command instanceof Command) {
          return command.run(context)
        } else {
          return command.run(context, command)
        }
      }
    ]

    return composeMiddleware(middleware)(context)
  }
}

export type CommandGroupClass<M, C, D = unknown> = new (
  options: CommandGroupOptions<M, C, D>
) => CommandGroup<M, C, D>
