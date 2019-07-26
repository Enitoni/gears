import { ArrayResolvable } from "../../core"
import { assert, resolveToArray, xor } from "../../core/helpers"
import { Chain, CommandLike, Matcher, Context, Middleware } from "../types"

/**
 * Options passed to the [[Command]] constructor
 * @category Command
 */
export interface CommandOptions<M, C, D> {
  matcher: Matcher<any, M, C>
  middleware?: ArrayResolvable<Middleware<any, M, C>>
  /** @deprecated Use middleware instead */
  action?: Middleware<any, M, C>
  metadata?: D
}

/**
 * An executable command which only executes if its [[Matcher]] is satisfied
 * @example
 * const command = new Command({
 *   matcher: matchPrefixes("sum"),
 *   middleware: (context) => {
 *     const { content } = context
 *
 *     const numbers = content.split(" ").map(n => Number(n))
 *     const result = numbers.reduce((a, b) => a + b)
 *
 *     console.log("The sum is:", result)
 *   }
 * })
 *
 * // Input: "sum 4 4"
 * // Output: "The sum is: 8"
 * @template M Message
 * @template C Client
 * @template D Metadata
 * @category Command
 */
export class Command<M, C, D = unknown> implements CommandLike<M, C> {
  public readonly metadata?: D
  public middleware: Middleware<any, M, C>[]
  private matcher: Matcher<any, M, C>

  constructor(options: CommandOptions<M, C, D>) {
    const { matcher, middleware, action, metadata } = options

    assert(xor(middleware, action), "Pass either an action or middleware to a Command")
    const safeMiddleware = resolveToArray(middleware! || action!)

    this.matcher = matcher
    this.middleware = safeMiddleware
    this.metadata = metadata
  }

  /**
   * @category Internal
   */
  public async getChain(context: Context<any, M, C>): Promise<Chain<M, C> | void> {
    context.issuer = this

    const resultContext = await this.matcher(context)

    if (resultContext) {
      return [{ command: this, context: { ...resultContext } }]
    }
  }
}

export type CommandClass<M, C, D = unknown> = new (
  options: CommandOptions<M, C, D>
) => Command<M, C, D>
