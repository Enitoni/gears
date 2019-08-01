import React from "react"
import { css, Global } from "@emotion/core"
import { Theme } from "../types/Theme"

const style = (theme: Theme) => css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
    line-height: inherit;
    margin: 0;
  }

  html,
  body {
    margin: 0;
    padding: 0;

    font-family: Barlow, sans-serif;

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

  svg {
    fill: ${theme.fontColors.normal};
  }

  * {
    box-sizing: border-box;

    scrollbar-color: ${theme.colors.accent} ${theme.transparencies.negative};
    scrollbar-width: thin;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
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
