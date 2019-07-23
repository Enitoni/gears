import React, { useEffect } from "react"
import { IS_SERVER } from "../constants"
import ReactDOM from "react-dom"
import { useObserver } from "mobx-react-lite"
import { StoreSerializer } from "../../../common/state/components/StoreSerializer"
import { useStores } from "../../../common/state/hooks/useStores"

const IMPORTED_CHARACTERS = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz"

export function Head() {
  const { metaStore } = useStores()

  return useObserver(() => {
    const { title } = metaStore.value

    const content = [
      <meta charSet="utf-8" />,
      <meta name="viewport" content="initial-scale=1" />,
      <title>{title !== "Gears" ? `${title} | Gears` : "Gears"}</title>,
      <link
        href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:700&display=swap&text=Gears"
        rel="stylesheet"
      />,
      <link
        href={`https://fonts.googleapis.com/css?family=Barlow:400,600,700&display=swap&text=${IMPORTED_CHARACTERS}`}
        rel="stylesheet"
      />,
      <StoreSerializer />
    ].map((element, i) => React.cloneElement(element, { key: i }))

    useEffect(() => {
      if (IS_SERVER) return

      document
        .querySelectorAll("[data-server-head=true]")
        .forEach(element => element.remove())
    })

    if (IS_SERVER) {
      return (
        <>
          {content.map(element =>
            React.cloneElement(element, {
              "data-server-head": true
            })
          )}
        </>
      )
    }

    return ReactDOM.createPortal(content, document.head)
  })
}
