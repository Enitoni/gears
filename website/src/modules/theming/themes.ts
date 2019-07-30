import { Theme } from "./types/Theme"
import _styled, { CreateStyled } from "@emotion/styled"

export const darkTheme: Theme = {
  colors: {
    primary: "#1a213b",
    accent: "#f5c721",
  },
  fontColors: {
    normal: "#eeeeee",
    muted: "rgba(255, 255, 255, 0.6)",
  },
  stateColors: {
    warning: "#1bbee2",
    danger: "#ffe500",
  },
  syntaxColors: {
    background: "#151a2f",
    keyword: "#7dde31",
    primitive: "#1bbee2",
    function: "#ff3767",
    class: "#f5c721",
    operator: "#eeeeee",
    comment: "#7b829d",
    lineNumber: "#4c5267",
  },
  transparencies: {
    positive: "rgba(26, 33, 59, 0.5)",
    negative: "rgba(0, 0, 0, 0.3)",
  },
  durations: {
    normal: "200ms",
  },
}

export const lightTheme: Theme = {
  colors: {
    primary: "#eeeeee",
    accent: "#e81e57",
  },
  fontColors: {
    normal: "#29274c",
    muted: "rgba(0, 0, 0, 0.6)",
  },
  stateColors: {
    warning: "#ffe500",
    danger: "#ff2b2b",
  },
  syntaxColors: {
    background: "#ffffff",
    keyword: "#e81e57",
    primitive: "#315edf",
    function: "#0e92c1",
    class: "#ff7800",
    operator: "#2ca664",
    comment: "rgba(78, 75, 125, 0.6)",
    lineNumber: "rgba(78, 75, 125, 0.4)",
  },
  transparencies: {
    positive: "rgba(0, 0, 0, 0.2)",
    negative: "rgba(0, 0, 0, 0.2)",
  },
  durations: {
    normal: "200ms",
  },
}

export const styled = _styled as CreateStyled<Theme>
