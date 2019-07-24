import { styled } from "../../../modules/theming/themes"
import { getTransparency } from "../../../modules/theming/helpers"
import React from "react"

const Container = styled.pre`
  font-family: Fira Mono, monospace;
  font-size: 15px;
  line-height: 21px;

  background: ${getTransparency("negative")};
  border-radius: 3px;

  padding: 16px;
`

export function Code(props: { children: React.ReactNode }) {
  return <Container>{props.children}</Container>
}
