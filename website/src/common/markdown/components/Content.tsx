import React from "react"
import { styled } from "../../../modules/theming/themes"
import { POSITIVE_ICON_SPACE } from "./Heading"

export const CONTENT_BREAKPOINT = "(max-width: 700px)"

const Container = styled.div`
  margin-left: ${() => POSITIVE_ICON_SPACE};
  font-size: 16px;

  @media ${CONTENT_BREAKPOINT} {
    margin-left: 0px;
    font-size: 14px;
  }
`

export function Content(props: { children: React.ReactNode }) {
  return <Container>{props.children}</Container>
}
