import { ArrayResolvable } from "../../core"
import { resolveToArray } from "../../core/helpers"
import { BaseContext, Chain, CommandLike, Matcher, Context, Middleware } from "../types"

/**
 * Options passed to the [[CommandGroup]] constructor
 * @category Command
 */
export interface CommandGroupOptions<M, C, D> {
  matcher: Matcher<any, M, C>
  commands: CommandLike<M, C>[]
  middleware?: ArrayResolvable<Middleware<any, M, C>>
  /** Custom metadata */
  metadata?: D
}

/**
 * A group of [[Command]]s, which will only match if the [[Matcher]] and a command in the [[CommandGroup]] matches
 * @category Command
 */
export class CommandGroup<M, C, D = unknown> implements CommandLike<M, C> {
  public readonly metadata?: D
  public middleware: Middleware<any, M, C>[]
  public commands: CommandLike<M, C>[]
  private matcher: Matcher<any, M, C>

  constructor(options: CommandGroupOptions<M, C, D>) {
    const { metadata, matcher, commands, middleware = [] } = options

    this.metadata = metadata
    this.matcher = matcher
    this.commands = commands
    this.middleware = resolveToArray(middleware)
  }

  public async getChain(context: BaseContext<M, C>): Promise<Chain<M, C> | void> {
    const newContext: Context<{}, M, C> = { ...context, issuer: this }
    const resultContext = await this.matcher(newContext)

    if (!resultContext) return

    for (const command of this.commands) {
      const chain = await command.getChain(resultContext)

      if (chain) return [{ command: this, context: { ...resultContext } }, ...chain]
    }
  }
}

export type CommandGroupClass<M, C, D = unknown> = new (
  options: CommandGroupOptions<M, C, D>
) => CommandGroup<M, C, D>