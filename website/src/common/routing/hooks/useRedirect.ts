import UrlPattern from "url-pattern"
import { useStores } from "../../state/hooks/useStores"
import { useObserver } from "mobx-react-lite"
import { useIsomorphicLayoutEffect } from "../../react/useIsomorphicLayoutEffect"

export const useRedirect = (from: string, to: string) => {
  const { routingStore } = useStores()
  const { pathname } = useObserver(() => routingStore.location)

  const safeFrom = from.replace(/\/$/, "")
  const safePathname = pathname.replace(/\/$/, "")

  useIsomorphicLayoutEffect(() => {
    const pattern = new UrlPattern(safeFrom)

    if (pattern.match(safePathname)) {
      routingStore.replace(to)
    }
  }, [safePathname, safeFrom, to])
}
