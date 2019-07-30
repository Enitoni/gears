import React, { useEffect } from "react"
import { IS_SERVER, CANONICAL_HOST } from "../constants"
import ReactDOM from "react-dom"
import { useObserver } from "mobx-react-lite"
import { StoreSerializer } from "../../../common/state/components/StoreSerializer"
import { useStores } from "../../../common/state/hooks/useStores"
import { useTheme } from "../../theming/hooks/useTheme"

const IMPORTED_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>,."

export function Head() {
  const { metaStore, routingStore } = useStores()
  const { colors } = useTheme()

  const { pathname } = useObserver(() => routingStore.location)
  const { title, description, thumb } = useObserver(() => metaStore.value)

  const keywords = ["javascript", "documentation", "gears", "bot", "library"]

  const renderDescription = (description: string) => {
    return (
      <>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </>
    )
  }

  const renderOGTags = () => {
    return (
      <>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`${CANONICAL_HOST}${pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${CANONICAL_HOST}/thumbs/${thumb}.png`} />
        <meta property="og:site_name" content="Gears" />
      </>
    )
  }

  const content = (
    <>
      <meta charSet="utf-8" />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="viewport" content="initial-scale=1" />
      <meta name="theme-color" content={IS_SERVER ? colors.accent : colors.primary} />
      <title>{title !== "Gears" ? `${title} | Gears` : "Gears"}</title>
      {renderDescription(description)}
      {renderOGTags()}
      <link
        href={`https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:500,700&display=swap&text=${IMPORTED_CHARACTERS}`}
        rel="stylesheet"
      />
      <link
        href={`https://fonts.googleapis.com/css?family=Barlow:500,600,700&display=swap&text=${IMPORTED_CHARACTERS}`}
        rel="stylesheet"
      />
      <link
        href={`https://fonts.googleapis.com/css?family=Fira+Mono:400,500&display=swap`}
        rel="stylesheet"
      />
      <link rel="icon" href="/favicons/favicon-16.png" sizes="16x16" type="image/png" />
      <link rel="icon" href="/favicons/favicon-32.png" sizes="32x32" type="image/png" />
      <link rel="icon" href="/favicons/favicon-64.png" sizes="64x64" type="image/png" />
      <link
        rel="icon"
        href="/favicons/favicon-256.png"
        sizes="256x256"
        type="image/png"
      />
      <link rel="icon" href="/favicons/favicon.svg" sizes="any" type="image/svg+xml" />
      <meta
        name="google-site-verification"
        content="Xx_2p0o7xgQWffhd_sDrhZ6VzShNibeRUYZyoUK1-PQ"
      />
      <StoreSerializer />
    </>
  )

  useEffect(() => {
    if (IS_SERVER) return

    document
      .querySelectorAll("[data-server-head=true]")
      .forEach(element => element.remove())
  }, [])

  if (IS_SERVER) {
    return (
      <>
        {React.Children.map(content.props.children, (element, i) =>
          React.cloneElement(element, {
            key: i,
            "data-server-head": true
          })
        )}
      </>
    )
  }

  return ReactDOM.createPortal(content, document.head)
}
