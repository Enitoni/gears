import { Context, Middleware } from "../types"

/**
 * @ignore
 */
export const composeMiddleware = (chain: Middleware[]) => async (
  context: Context,
  next?: Middleware,
) => {
  let index = -1

  const run = async (i: number): Promise<any> => {
    if (index >= i) {
      throw new Error("next() was called more than once")
    }

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
