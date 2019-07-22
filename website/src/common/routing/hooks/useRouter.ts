import React from "react"
import { manager } from "../../state/manager"
import { useObserver } from "mobx-react-lite"
import UrlPattern from "url-pattern"

export interface Route {
  pattern: string
  render: <T extends object>(params: T) => React.ReactElement
}

export const useRouter = (routes: Route[]) => {
  const { routingStore } = manager.stores

  return useObserver(() => {
    const { pathname } = routingStore.location

    for (const route of routes) {
      const match = new UrlPattern(route.pattern).match(pathname)

      if (match) {
        return () => route.render(match)
      }
    }

    return () => null
  })
}
