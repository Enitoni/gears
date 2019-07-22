import React from "react"
import { css, Global } from "@emotion/core"
import { Theme } from "../types/Theme"
import { getColor } from "../helpers"

const style = (theme: Theme) => css`
  html,
  body {
    margin: 0;
    padding: 0;

    font-family: Barlow;
    background: ${theme.colors.primary};
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export function GlobalStyles() {
  return <Global styles={style} />
}
