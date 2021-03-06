import { styled } from "../../../modules/theming/themes"
import React from "react"

const Container = styled.p`
  font-size: 1em;
  font-weight: 500;
  letter-spacing: 0.03em;

  margin: 16px 0px;
`

export function Paragraph(props: { children: React.ReactNode }) {
  return <Container>{props.children}</Container>
}
