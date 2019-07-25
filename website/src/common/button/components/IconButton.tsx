import React from "react"

import { size } from "polished"
import { styled } from "../../../modules/theming/themes"

import { IconType } from "../../icon/types/IconType"
import { Icon } from "../../icon/components/Icon"
import {
  getTransparency,
  getDuration,
  getFontColor
} from "../../../modules/theming/helpers"

export interface IconButtonProps extends ContainerProps {
  icon: IconType
  onClick: () => void
}

export interface ContainerProps {
  active?: boolean
}

const Container = styled.a<ContainerProps>`
  ${size(40)}

  display: flex;
  justify-content: center;
  align-items: center;

  transition: ${getDuration("normal")} ease;
  transition-property: background;

  > .icon {
    ${size(24)}
  }

  ${props => {
    const { theme } = props
    const { fontColors, colors, transparencies } = theme

    const inactive = `
      &:hover {
        cursor: pointer;
        background: ${transparencies.positive};
      }
    
      &:active {
        background: ${transparencies.negative};
      }
    `

    const active = `
      background: ${fontColors.normal};
      cursor: pointer;

      > .icon {
        fill: ${colors.primary};
      }
    `

    return props.active ? active : inactive
  }}

  border-radius: 3px;
`

export function IconButton(props: IconButtonProps) {
  const { icon, active, onClick } = props

  return (
    <Container active={active} onClick={onClick}>
      <Icon className="icon" name={icon} />
    </Container>
  )
}
