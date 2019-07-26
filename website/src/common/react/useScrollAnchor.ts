import React, { useEffect } from "react"
import { useStores } from "../state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

export const useScrollAnchor = (path: string) => {
  const ref = React.useRef<any>(null)

  const { routingStore } = useStores()
  const { hash, pathname } = useObserver(() => {
    const { location } = routingStore
    const { hash, pathname } = location

    return { hash, pathname }
  })

  useEffect(() => {
    const { current: element } = ref
    if (!element) return

    const id = element.getAttribute("id")
    const isHash = path.startsWith("#")
    const safePath = isHash ? hash : pathname

    if (!id) throw new Error("Can't useScrollAnchor on a tag without id")

    if (path === safePath) {
      element.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [hash, pathname, path])

  return ref
}
