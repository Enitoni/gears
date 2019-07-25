import { Theme } from "./types/Theme"
import _styled, { CreateStyled } from "@emotion/styled"

export const darkTheme: Theme = {
  colors: {
    primary: "#29274c",
    accent: "#e81e57"
  },
  fontColors: {
    normal: "#eeeeee",
    muted: "rgba(255, 255, 255, 0.6)"
  },
  stateColors: {
    warning: "#ffe500",
    danger: "#ff2b2b"
  },
  syntaxColors: {
    background: "rgba(0, 0, 0, 0.25)",
    keyword: "#ff1c7b",
    primitive: "#7593e8",
    function: "#35d1e1",
    class: "#f1d95f",
    operator: "#67cd96",
    comment: "#4e4b7d",
    lineNumber: "rgba(78, 75, 125, 0.5)"
  },
  transparencies: {
    positive: "rgba(78, 75, 125, 0.5)",
    negative: "rgba(0, 0, 0, 0.2)"
  },
  durations: {
    normal: "200ms"
  }
}

export const lightTheme: Theme = {
  colors: {
    primary: "#eeeeee",
    accent: "#e81e57"
  },
  fontColors: {
    normal: "#29274c",
    muted: "rgba(0, 0, 0, 0.6)"
  },
  stateColors: {
    warning: "#ffe500",
    danger: "#ff2b2b"
  },
  syntaxColors: {
    background: "#ffffff",
    keyword: "#e81e57",
    primitive: "#315edf",
    function: "#0e92c1",
    class: "#ff7800",
    operator: "#2ca664",
    comment: "rgba(78, 75, 125, 0.6)",
    lineNumber: "rgba(78, 75, 125, 0.4)"
  },
  transparencies: {
    positive: "rgba(0, 0, 0, 0.2)",
    negative: "rgba(0, 0, 0, 0.2)"
  },
  durations: {
    normal: "200ms"
  }
}

export const styled = _styled as CreateStyled<Theme>
