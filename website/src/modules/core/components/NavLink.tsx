import React from "react"
import css from "@emotion/css"

import { useRouteLink } from "../../../common/routing/hooks/useRouteLink"
import { styled } from "../../theming/themes"
import { getFontColor, getDuration } from "../../theming/helpers"

import { Icon } from "../../../common/icon/components/Icon"
import { IconType } from "../../../common/icon/types/IconType"
import { size } from "polished"

export interface NavLinkProps {
  icon: IconType
  to: string
  activeTo?: string
  children: React.ReactNode
}

const Container = styled.a<{ active: boolean }>`
  height: 48px;

  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 18px;
  color: ${getFontColor("normal")};

  transition: ${getDuration("normal")} ease;
  transition-property: color, border-bottom;

  > .icon {
    ${size(24)}

    fill: ${getFontColor("normal")};
    margin-right: 16px;

    transition: ${getDuration("normal")} ease;
    transition-property: fill;
  }

  ${props => {
    const active = `
      color: ${props.theme.colors.accent};

      > .icon {
        fill: ${props.theme.colors.accent};
      }
    `

    const inactive = `
      &:hover {
        color: ${props.theme.fontColors.muted};
      }

      &:hover > .icon {
        fill: ${props.theme.fontColors.muted};
      }
    `

    return props.active ? active : inactive
  }}
`

export function NavLink(props: NavLinkProps) {
  const [active, click] = useRouteLink(props.to, props.activeTo)

  return (
    <Container href={props.to} active={active} onClick={click}>
      <Icon className="icon" name={props.icon} />
      {props.children}
    </Container>
  )
}
