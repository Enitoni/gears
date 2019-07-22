import { manager } from "../../state/manager"
import { useObserver } from "mobx-react-lite"
import UrlPattern from "url-pattern"

export const useRouteLink = (to: string, activeTo = to) => {
  const { routingStore } = manager.stores

  const click = (event: React.MouseEvent) => {
    event.preventDefault()
    routingStore.push(to)
  }

  return useObserver(() => {
    const { pathname } = routingStore.location

    const pattern = new UrlPattern(activeTo)
    const active = pattern.match(pathname) !== null

    return [active, click] as const
  })
}
