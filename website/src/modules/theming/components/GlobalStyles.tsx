import React from "react"
import { css, Global } from "@emotion/core"
import { Theme } from "../types/Theme"

const style = (theme: Theme) => css`
  html,
  body {
    margin: 0;
    padding: 0;

    font-family: Barlow;

    color: ${theme.fontColors.normal};
    background: ${theme.colors.primary};
  }

  body {
    overflow-y: scroll;
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;

    background: ${theme.transparencies.negative};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.accent};
    border-radius: 100px;
  }
`

export function GlobalStyles() {
  return <Global styles={style} />
}
