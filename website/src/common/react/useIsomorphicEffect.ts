import { IS_SERVER } from "../../modules/core/constants"
import { useEffect } from "react"

export const useIsomorphicEffect = (
  callback: () => void | (() => void),
  deps?: any[]
) => {
  if (IS_SERVER) {
    callback()
  } else {
    useEffect(callback, deps)
  }
}
