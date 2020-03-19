import { Chain, NextFunction } from "../types"
import { composeMiddleware } from "./composeMiddleware"

/**
 * This composes a chain and manages context to make sure
 * each context is correct based on the level in the chain
 * @ignore
 */
export const composeChain = (chain: Chain<any, any>) => {
  let globalContext = chain[0].context

  const middleware = chain.map(entry => {
    const { chainer, context } = entry

    const middleware = composeMiddleware(chainer.middleware)
    const safeContext = { ...globalContext, ...context }

    return async (_: any, next: NextFunction<any>) => {
      const response = await middleware(safeContext, () => {
        globalContext = safeContext
        if (next) return next()
      })

      return response
    }
  })

  const composed = composeMiddleware(middleware)

  return async () => {
    return composed(globalContext)
  }
}
