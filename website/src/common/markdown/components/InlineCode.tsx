import { styled } from "../../../modules/theming/themes"
import React from "react"
import { getSyntaxColor } from "../../../modules/theming/helpers"

export interface InlineCodeProps {
  children: React.ReactNode
}

const Container = styled.code`
  font-family: Fira Mono, monospace;
  font-size: 0.9em;

  background: ${getSyntaxColor("background")};
  padding: 2px;
  border-radius: 3px;
`

export function InlineCode(props: InlineCodeProps) {
  return <Container>{props.children}</Container>
}
