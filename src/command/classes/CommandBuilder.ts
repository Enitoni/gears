import { CommandMatcher, Middleware } from "../types"
import { assert } from "../../core/helpers"
import { Command } from "./Command"

/**
 * A way to build a [[Command]] with the builder pattern
 * @category Command
 */
export class CommandBuilder<M, C, D = any, S extends object = {}> {
  private metadata!: D

  private matcher!: CommandMatcher<S, M, C>
  private middleware: Middleware<S, M, C>[] = []

  /**
   * Set [[CommandMatcher]]
   */
  public match<T extends object>(matcher: CommandMatcher<T & S, M, C>) {
    assert(!this.matcher, "Cannot use match() more than once")
    this.matcher = matcher

    return (this as any) as CommandBuilder<M, C, D, T & S>
  }

  public setMetadata<T extends D>(data: T) {
    this.metadata = data
    return (this as any) as CommandBuilder<M, C, T, S>
  }

  /**
   * Use [[Middleware]]
   */
  public use<T extends object>(middleware: Middleware<T & S, M, C>) {
    this.middleware.push(middleware as any)
    return (this as any) as CommandBuilder<M, C, D, T & S>
  }

  /**
   * Returns the built [[Command]]
   */
  public done() {
    assert(!!this.matcher, "No matcher specified. Set a matcher with match()")
    assert(
      this.middleware.length > 0,
      "No middleware specified. Add middleware with use()"
    )

    const { matcher, metadata, middleware } = this
    return new Command<M, C, D>({ matcher, middleware, metadata })
  }
}
