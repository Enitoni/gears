import React, { useLayoutEffect } from "react"
import { useStores } from "../state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

export const useScrollAnchor = () => {
  const ref = React.useRef<any>(null)

  const { routingStore } = useStores()
  const hash = useObserver(() => routingStore.location.hash)

  useLayoutEffect(() => {
    const { current: element } = ref
    if (!element) return

    const id = element.getAttribute("id")
    if (!id) throw new Error("Can't useScrollAnchor on a tag without id")

    if (`#${id}` === hash) {
      element.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [hash])

  return ref
}
