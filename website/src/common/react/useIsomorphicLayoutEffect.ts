import { IS_SERVER } from "../../modules/core/constants"
import { useLayoutEffect } from "react"

export const useIsomorphicLayoutEffect = (
  callback: () => void | (() => void),
  deps?: any[]
) => {
  if (IS_SERVER) {
    const dispose = callback()

    if (dispose) {
      dispose()
    }
  } else {
    useLayoutEffect(callback, deps)
  }
}
