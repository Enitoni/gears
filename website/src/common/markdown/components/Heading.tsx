import React from "react"
import { styled } from "../../../modules/theming/themes"
import { Icon } from "../../icon/components/Icon"
import { size } from "polished"
import { getColor } from "../../../modules/theming/helpers"
import { SECTION_ICON_SIZE, SECTION_ICON_MARGIN } from "./Section"
import { IconType } from "../../icon/types/IconType"

export interface HeadingProps {
  icon?: IconType
  children: React.ReactNode
}

export const ICON_SPACE =
  parseInt(SECTION_ICON_SIZE) + parseInt(SECTION_ICON_MARGIN) + "px"

const Container = styled.div<{ hasIcon: boolean }>`
  display: flex;
  align-items: flex-end;

  > .icon {
    ${size(SECTION_ICON_SIZE)}
    fill: ${getColor("accent")};

    margin-right: ${SECTION_ICON_MARGIN};
  }

  ${props =>
    props.hasIcon &&
    `
    margin-left: -${ICON_SPACE};
  `}
`

const Title = styled.h2`
  color: ${getColor("accent")};

  font-family: Barlow Semi Condensed;
  font-weight: bold;
  font-size: 36px;
  line-height: 31px;

  margin-right: 8px;
`

export function Heading(props: HeadingProps) {
  const { icon, children } = props

  const renderIcon = () => {
    if (!icon) return null

    return <Icon className="icon" name={icon} />
  }

  return (
    <Container hasIcon={!!icon}>
      {renderIcon()}
      <Title>{children}</Title>
    </Container>
  )
}
