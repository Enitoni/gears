import { Theme } from "./types/Theme"
import _styled, { CreateStyled } from "@emotion/styled"

export const darkTheme: Theme = {
  colors: {
    primary: "#29274c",
    accent: "#e81e57"
  },
  fontColors: {
    normal: "#eeeeee"
  },
  transparencies: {
    positive: "rgba(255, 255, 255, 0.3)",
    negative: "rgba(0, 0, 0, 0.3)"
  }
}

export const styled = _styled as CreateStyled<Theme>
