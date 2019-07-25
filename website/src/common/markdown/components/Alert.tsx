import React from "react"
import { styled } from "../../../modules/theming/themes"
import { Theme } from "../../../modules/theming/types/Theme"

export type AlertType = "note" | "warning"

export interface AlertProps extends StyleProps {
  children: React.ReactNode
}

export interface StyleProps {
  type: AlertType
}

const Container = styled.div<StyleProps>`
  font-weight: 600;
  padding: 16px;

  border: solid 2px white;
  border-radius: 3px;
  border-color: ${props => props.theme.stateColors[typeToColorMap[props.type]]};
`

const Title = styled.h4<StyleProps>`
  letter-spacing: 0.05em;
  text-transform: uppercase;

  font-weight: bold;
  font-size: 14px;

  margin-bottom: 16px;

  color: ${props => props.theme.stateColors[typeToColorMap[props.type]]};
`

const typeToColorMap: Record<AlertType, keyof Theme["stateColors"]> = {
  note: "warning",
  warning: "danger"
}

export function Alert(props: AlertProps) {
  const { type, children } = props

  return (
    <Container type={type}>
      <Title type={type}>{type}</Title>
      {children}
    </Container>
  )
}
