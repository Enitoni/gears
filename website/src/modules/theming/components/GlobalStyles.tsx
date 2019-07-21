import React from "react"
import { css, Global } from "@emotion/core"
import { Theme } from "../types/Theme"

const style = (theme: Theme) => css`
  html,
  body {
    margin: 0;
    padding: 0;

    background: ${theme.colors.primary};
  }

  * {
    box-sizing: border-box;
  }
`

export function GlobalStyles() {
  return <Global styles={style} />
}
