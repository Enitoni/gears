import { DiagramType } from "../types/DiagramType"
import * as diagrams from "../diagrams"
import { useTheme } from "../../theming/hooks/useTheme"
import React from "react"

export interface DiagramProps {
  name: DiagramType
}

export function Diagram(props: DiagramProps) {
  const { name } = props
  const { colors } = useTheme()

  if (!diagrams[name]) return null

  return React.cloneElement(diagrams[name], {
    width: "100%",
    height: "100%",
    style: {
      marginTop: 16,
      fill: colors.accent,
      maxWidth: "374px",
    },
  })
}
