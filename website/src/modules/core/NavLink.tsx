import { useRouteLink } from "../../common/routing/hooks/useRouteLink"
import { styled } from "../theming/themes"
import React from "react"
import { getFontColor, getColor, getTransparency, getDuration } from "../theming/helpers"
import css from "@emotion/css"

export interface NavLinkProps {
  to: string
  activeTo?: string
  children: React.ReactNode
}

const Container = styled.a<{ active: boolean }>`
  font-weight: 600;
  font-size: 18px;
  text-transform: lowercase;

  padding-bottom: 14px;
  border-bottom: 2px solid transparent;

  color: ${getFontColor("normal")};

  transition: ${getDuration("normal")} ease;
  transition-property: color, border-bottom;

  ${props => {
    const { accent } = props.theme.colors
    const { positive } = props.theme.transparencies

    const active = css`
      color: ${accent};
      border-bottom-color: ${accent};
    `

    const inactive = css`
      &:hover {
        border-bottom-color: ${positive};
      }
    `

    return props.active ? active : inactive
  }}

  & ~ a {
    margin-left: 32px;
  }
`

export function NavLink(props: NavLinkProps) {
  const [active, click] = useRouteLink(props.to, props.activeTo)

  return (
    <Container href={props.to} active={active} onClick={click}>
      {props.children}
    </Container>
  )
}
