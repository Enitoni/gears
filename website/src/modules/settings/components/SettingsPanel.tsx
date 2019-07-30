import React from "react"
import { styled } from "../../theming/themes"
import { getColor } from "../../theming/helpers"

const Container = styled.div`
  background: ${getColor("primary")};
`

export function SettingsPanel() {
  return <Container>t</Container>
}
