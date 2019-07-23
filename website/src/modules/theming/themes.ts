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
  transparencies: {
    positive: "rgba(0, 0, 0, 0.2)",
    negative: "rgba(0, 0, 0, 0.2)"
  },
  durations: {
    normal: "200ms"
  }
}

export const styled = _styled as CreateStyled<Theme>
