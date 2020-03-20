import { ArrayResolvable } from "../../core"
import { Chain, MiddlewareChainer, Matcher, Context, Middleware } from "../types"
import { VALIDATE_BEFORE_ADD } from "../symbols"

/**
 * An executable command which only executes if its [[Matcher]] is satisfied
 * @example
 * const command = new Command()
 *   .match(matchPrefixes("sum"))
 *   .use(context => {
 *     const { content } = context
 *
 *     const numbers = content.split(" ").map(n => Number(n))
 *     const result = numbers.reduce((a, b) => a + b)
 *
 *     console.log("The sum is:", result)
 *   })
 *
 * // Input: "sum 4 4"
 * // Output: "The sum is: 8"
 * @template M Message
 * @template C Client
 * @template D Metadata
 * @category Command
 */
export class Command<M, C, D = any, S extends object = {}>
  implements MiddlewareChainer<M, C> {
  public metadata?: D
  public middleware: Middleware<any, M, C>[] = []
  private matcher?: Matcher<any, M, C>

  /**
   * Set [[Matcher]]
   */
  public match<T extends object>(matcher: Matcher<T & S, M, C>) {
    if (this.matcher) {
      throw new TypeError("Cannot use match() more than once")
    }

    this.matcher = matcher as any
    return (this as any) as Command<M, C, D, T & S>
  }

  public setMetadata<T extends D>(data: T) {
    this.metadata = data
    return (this as any) as Command<M, C, T, S>
  }

  /**
   * Add [[Middleware]]. The order that you call this is the order the middleware will be in
   */
  public use<T extends object>(middleware: Middleware<T & S, M, C>) {
    this.middleware.push(middleware as any)
    return (this as any) as Command<M, C, D, T & S>
  }

  /**
   * @category Internal
   */
  public async getChain(context: Context<any, M, C>): Promise<Chain<M, C> | void> {
    context.issuer = this
    const resultContext = await this.matcher!(context)

    if (resultContext) {
      return [{ chainer: this, context: { ...resultContext } }]
    }
  }

  public [VALIDATE_BEFORE_ADD]() {
    if (!this.matcher) {
      throw new TypeError("No matcher specified. Set a matcher with match()")
    }

    if (this.middleware.length === 0) {
      throw new TypeError(
        "No middleware specified. Middleware is required in commands. Add middleware with use()",
      )
    }
  }
}

export type CommandType<M, C, D = unknown> = new () => Command<M, C, D>
