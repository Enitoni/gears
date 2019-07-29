import { useStores } from "../../state/hooks/useStores"
import { useObserver } from "mobx-react-lite"
import { useIsomorphicEffect } from "../../react/useIsomorphicEffect"
import UrlPattern from "url-pattern"

export const useRedirect = (from: string, to: string) => {
  const { routingStore } = useStores()
  const { pathname } = useObserver(() => routingStore.location)

  const safeFrom = from.replace(/\/$/, "")
  const safePathname = pathname.replace(/\/$/, "")

  useIsomorphicEffect(() => {
    const pattern = new UrlPattern(safeFrom)

    if (pattern.match(safePathname)) {
      routingStore.replace(to)
    }
  }, [safePathname, safeFrom, to])
}
