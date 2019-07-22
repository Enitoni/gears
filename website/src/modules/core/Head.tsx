import React from "react"
import { IS_SERVER } from "./constants"
import ReactDOM from "react-dom"

const IMPORTED_CHARACTERS = "ABCDEFGHIKLMNOPQRSTUVXYZabcdefghiklmnopqrstuvxyz"

export function Head() {
  const content = (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1" />
      <title>Gears</title>
      <link
        href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:700&display=swap&text=Gears"
        rel="stylesheet"
      />
      <link
        href={`https://fonts.googleapis.com/css?family=Barlow:400,600,700&display=swap&text=${IMPORTED_CHARACTERS}`}
        rel="stylesheet"
      />
    </>
  )

  if (IS_SERVER) {
    return (
      <>
        {React.Children.map(content, element =>
          React.cloneElement(element, {
            "data-server-head": true
          })
        )}
      </>
    )
  }

  return ReactDOM.createPortal(content, document.head)
}
