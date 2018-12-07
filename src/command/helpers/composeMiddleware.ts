import { assert } from "../../core/helpers"
import { Context, Middleware } from "../types"

export const composeMiddleware = (chain: Middleware[]) => async (
  context: Context,
  next?: Middleware
) => {
  let index = -1

  const run = async (i: number): Promise<any> => {
    assert(index < i, "Do not call next() more than once")
    index = i

    let middleware: Middleware | undefined = chain[i]

    /** No more middleware left */
    if (chain.length === i) middleware = next

    if (middleware) {
      return middleware(context, () => run(i + 1))
    } else {
      return
    }
  }

  return run(0)
}
