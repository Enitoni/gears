import React from "react"
import { ThemeProvider } from "emotion-theming"
import { darkTheme } from "../themes"

export function Theme(props: { children: any }) {
  return <ThemeProvider theme={darkTheme}>{props.children}</ThemeProvider>
}
