import { ArrayResolvable } from "../../core"
import { assert, resolveToArray } from "../../core/helpers"
import { Chain, CommandLike, CommandMatcher, Context, Middleware } from "../types"

export interface CommandOptions<M, C, D> {
  matcher: CommandMatcher<unknown, M, C>
  middleware?: ArrayResolvable<Middleware<unknown, M, C>>
  action?: Middleware<unknown, M, C>
  data?: D
}

export class Command<M, C, D = unknown> implements CommandLike<M, C> {
  public data?: D
  public middleware: Middleware<unknown, M, C>[]
  private matcher: CommandMatcher<unknown, M, C>

  constructor(options: CommandOptions<M, C, D>) {
    const { matcher, middleware, action, data } = options

    assert(
      !!middleware || (!!action && !(!!middleware && !!middleware)),
      "Pass either an action or middleware to a Command"
    )

    const safeMiddleware = resolveToArray(middleware! || action!)

    this.matcher = matcher
    this.middleware = safeMiddleware
    this.data = data
  }

  public async getChain(context: Context<unknown, M, C>): Promise<Chain<M, C> | void> {
    context.issuer = this

    const resultContext = await this.matcher(context)

    if (resultContext) {
      return {
        commands: [this],
        context
      }
    }
  }
}

export type CommandClass<M, C, D = unknown> = new (
  options: CommandOptions<M, C, D>
) => Command<M, C, D>
