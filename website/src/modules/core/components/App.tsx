import React from "react"
import { Theme } from "../../theming/components/Theme"
import { GlobalStyles } from "../../theming/components/GlobalStyles"
import { Header } from "./Header"
import { IS_SERVER } from "../constants"
import { Head } from "./Head"
import { Body } from "./Body"

export function App() {
  const renderHead = () => {
    if (IS_SERVER) return null
    return <Head />
  }

  return (
    <Theme>
      {renderHead()}
      <GlobalStyles />
      <Header />
      <Body />
    </Theme>
  )
}
