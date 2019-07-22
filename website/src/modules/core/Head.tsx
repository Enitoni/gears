import React, { useEffect } from "react"
import { IS_SERVER } from "./constants"
import ReactDOM from "react-dom"
import { manager } from "../../common/state/manager"
import { useObserver } from "mobx-react-lite"

const IMPORTED_CHARACTERS = "ABCDEFGHIKLMNOPQRSTUVXYZabcdefghiklmnopqrstuvxyz"

export function Head() {
  const { metaStore } = manager.stores

  return useObserver(() => {
    const { title } = metaStore.value

    const content = [
      <meta charSet="utf-8" />,
      <meta name="viewport" content="initial-scale=1" />,
      <title>{title}</title>,
      <link
        href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:700&display=swap&text=Gears"
        rel="stylesheet"
      />,
      <link
        href={`https://fonts.googleapis.com/css?family=Barlow:400,600,700&display=swap&text=${IMPORTED_CHARACTERS}`}
        rel="stylesheet"
      />
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
