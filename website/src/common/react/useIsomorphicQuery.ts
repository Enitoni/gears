import { IS_SERVER } from "../../modules/core/constants"
import { useStores } from "../state/hooks/useStores"
import { useEffect, useState } from "react"

export type QueryType = "max" | "min"

export interface IsomorphicQuery {
  type: QueryType
  value: number
}

export const useIsomorphicQuery = (entry: IsomorphicQuery) => {
  const { ssrStore } = useStores()

  if (IS_SERVER) {
    const { width } = ssrStore.viewport
    const { type, value } = entry

    return type === "max" ? value < width : value > width
  }

  // eslint-disable-next-line
  const [media] = useState(() =>
    window.matchMedia(
      entry.type === "max"
        ? `(max-width: ${entry.value}px)`
        : `(min-width: ${entry.value}px)`,
    ),
  )

  // eslint-disable-next-line
  const [matching, setMatching] = useState(media.matches)

  // eslint-disable-next-line
  useEffect(() => {
    const handleChange = () => {
      setMatching(media.matches)
    }

    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [media])

  return matching
}
