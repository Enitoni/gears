import { ArrayResolvable } from "../../core"

import {
  BaseContext,
  Chain,
  MiddlewareChainer,
  Matcher,
  Context,
  Middleware,
} from "../types"
import { VALIDATE_BEFORE_ADD } from "../symbols"
import { CommandLike } from "../types/CommandLike"

/**
 * Options passed to the [[CommandGroup]] constructor
 * @category Command
 */
export interface CommandGroupOptions<M, C, D> {
  matcher: Matcher<any, M, C>
  commands: MiddlewareChainer<M, C>[]
  middleware?: ArrayResolvable<Middleware<any, M, C>>
  /** Custom metadata */
  metadata?: D
}

/**
 * A group of [[Command]], which will only match if the [[Matcher]] and a command in the group matches
 * @example
 * const group = new CommandGroup({
 *   matcher: matchPrefixes("!"),
 *   commands: [sumCommand]
 * })
 *
 * // Input: "!sum 2 2"
 * // Output: "The sum is: 4"
 *
 * // Input: "!something"
 * // Output: nothing
 *
 * // Input: "?sum 5 3"
 * // Output: nothing
 * @template M Message
 * @template C Client
 * @template D Metadata
 * @category Command
 */
export class CommandGroup<M, C, D = any, S extends object = {}>
  implements MiddlewareChainer<M, C> {
  public metadata?: D
  private matcher?: Matcher<any, M, C>

  public middleware: Middleware<any, M, C>[] = []
  public commands: CommandLike<M, C>[] = []

  /**
   * Set [[Matcher]]
   */
  public match<T extends object>(matcher: Matcher<T & S, M, C>) {
    if (this.matcher) {
      throw new TypeError("Cannot use match() more than once")
    }

    this.matcher = matcher as any

    return (this as any) as CommandGroup<M, C, D, T & S>
  }

  public setMetadata<T extends D>(data: T) {
    this.metadata = data
    return (this as any) as CommandGroup<M, C, T, S>
  }

  /**
   * Add [[Middleware]]. The order that you call this is the order the middleware will be in
   */
  public use<T extends object>(middleware: Middleware<T & S, M, C>) {
    this.middleware.push(middleware as any)
    return (this as any) as CommandGroup<M, C, D, T & S>
  }

  /**
   * Set the commands for this [[CommandGroup]]
   */
  public setCommands(...commands: CommandLike<M, C>[]) {
    if (this.commands.length > 0) {
      throw new TypeError("Cannot use setCommands() more than once")
    }

    this.commands = commands
    return this
  }

  /**
   * @category Internal
   */
  public async getChain(context: BaseContext<M, C>): Promise<Chain<M, C> | void> {
    const newContext: Context<any, M, C> = { ...context, issuer: this }
    const resultContext = await this.matcher!(newContext)

    if (!resultContext) return

    for (const command of this.commands) {
      const chain = await (command as MiddlewareChainer<M, C>).getChain(resultContext)
      if (chain) return [{ chainer: this, context: { ...resultContext } }, ...chain]
    }
  }

  public [VALIDATE_BEFORE_ADD]() {
    if (!this.matcher) {
      throw new TypeError("No matcher specified. Set a matcher with match()")
    }

    console.assert(
      this.commands.length === 0,
      "Command group has no commands. Did you forget to call setCommands()?",
    )

    this.commands.map(command => command[VALIDATE_BEFORE_ADD]())
  }
}

export type CommandGroupType<M, C, D = unknown> = new () => CommandGroup<M, C, D>
