import { IS_SERVER } from "../../modules/core/constants"
import { useEffect } from "react"

export const useIsomorphicEffect = (
  callback: () => void | (() => void),
  deps?: any[]
) => {
  if (IS_SERVER) {
    const dispose = callback()

    if (dispose) {
      dispose()
    }
  } else {
    useEffect(callback, deps)
  }
}
