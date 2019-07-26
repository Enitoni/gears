import React, { useLayoutEffect } from "react"
import { useStores } from "../state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

export const useScrollAnchor = () => {
  const ref = React.createRef<HTMLAnchorElement>()

  const { routingStore } = useStores()
  const hash = useObserver(() => routingStore.location.hash)

  useLayoutEffect(() => {
    const { current: element } = ref
    if (!element) return

    const href = element.getAttribute("href")
    if (!href) throw new Error("Can't useScrollAnchor on a tag without href")

    if (href === hash) {
      element.scrollIntoView()
    }
  }, [hash])

  return ref
}
