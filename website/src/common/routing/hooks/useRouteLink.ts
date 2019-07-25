import { useObserver } from "mobx-react-lite"
import { useStores } from "../../state/hooks/useStores"
import UrlPattern from "url-pattern"

export const useRouteLink = (to: string, activeTo = to) => {
  const { routingStore } = useStores()

  const click = (event: React.MouseEvent) => {
    event.preventDefault()
    routingStore.push(to)
  }

  return useObserver(() => {
    const { pathname, hash } = routingStore.location

    const hasHash = activeTo.includes("#")
    const safePathName = hasHash ? `${pathname}${hash}` : pathname

    const pattern = new UrlPattern(activeTo)
    const active = pattern.match(safePathName) !== null

    return [active, click] as const
  })
}
