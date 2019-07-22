import React from "react"
import { Theme } from "../theming/components/Theme"
import { GlobalStyles } from "../theming/components/GlobalStyles"
import { Header } from "./Header"

export function App() {
  return (
    <Theme>
      <GlobalStyles />
      <Header />
    </Theme>
  )
}
