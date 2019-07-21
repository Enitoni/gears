import { CommandLike, Matcher, Middleware } from "../types"
import { CommandGroup } from "./CommandGroup"
import { assert } from "../../core/helpers"

/**
 * A way to build a [[CommandGroup]] with the builder pattern
 * @category Command
 */
export class CommandGroupBuilder<M, C, D = any, S extends object = {}> {
  private commands: CommandLike<M, C>[] = []
  private metadata!: D

  private matcher!: Matcher<S, M, C>
  private middleware: Middleware<S, M, C>[] = []

  /**
   * Set [[Matcher]]
   */
  public match<T extends object>(matcher: Matcher<T & S, M, C>) {
    assert(!this.matcher, "Cannot use match() more than once")
    this.matcher = matcher

    return (this as any) as CommandGroupBuilder<M, C, D, T & S>
  }

  public setMetadata<T extends D>(data: T) {
    this.metadata = data
    return (this as any) as CommandGroupBuilder<M, C, T, S>
  }

  /**
   * Use [[Middleware]]
   */
  public use<T extends object>(middleware: Middleware<T & S, M, C>) {
    this.middleware.push(middleware as any)
    return (this as any) as CommandGroupBuilder<M, C, D, T & S>
  }

  /**
   * Set the commands for this [[CommandGroup]]
   */
  public setCommands(...commands: CommandLike<M, C>[]) {
    this.commands = commands
    return this
  }

  public done() {
    assert(!!this.matcher, "No matcher specified. Set a matcher with match()")

    assert(
      this.middleware.length > 0,
      "No middleware specified. Add middleware with use()"
    )
    assert(
      this.commands.length > 0,
      "No commands specified. Set commands with setCommands()"
    )

    const { matcher, metadata, middleware, commands } = this
    return new CommandGroup<M, C, D>({ matcher, middleware, commands, metadata })
  }
}
