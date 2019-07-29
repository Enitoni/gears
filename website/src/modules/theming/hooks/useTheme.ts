import { useContext } from "react"
import { Theme } from "../../theming/types/Theme"
import { ThemeContext } from "@emotion/core"

export const useTheme = () => useContext(ThemeContext) as Theme
