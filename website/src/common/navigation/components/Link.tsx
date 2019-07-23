import React from "react"

import { styled } from "../../../modules/theming/themes"
import { getFontColor, getColor, getDuration } from "../../../modules/theming/helpers"
import { useRouteLink } from "../../routing/hooks/useRouteLink"

const Container = styled.a`
  color: ${getFontColor("muted")};

  transition: ${getDuration("normal")} ease;
  transition-property: color;

  &:hover {
    color: ${getColor("accent")};
  }
`

export interface LinkProps {
  to: string
  children?: React.ReactNode
}

export function Link(props: LinkProps) {
  const { to, children } = props
  const [_, click] = useRouteLink(to)

  return (
    <Container href={to} onClick={click}>
      {children}
    </Container>
  )
}
