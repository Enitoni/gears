import React from "react"
import { styled } from "../../../modules/theming/themes"
import { Icon } from "../../icon/components/Icon"
import { size } from "polished"
import { getColor } from "../../../modules/theming/helpers"
import { SECTION_ICON_SIZE, SECTION_ICON_MARGIN } from "./Section"
import { IconType } from "../../icon/types/IconType"
import { CONTENT_BREAKPOINT } from "./Content"

export interface HeadingProps {
  icon?: IconType
  children: React.ReactNode
}

export const NEGATIVE_ICON_SPACE = `calc(-${SECTION_ICON_SIZE} + -${SECTION_ICON_MARGIN})`
export const POSITIVE_ICON_SPACE = `calc(${SECTION_ICON_SIZE} + ${SECTION_ICON_MARGIN})`

const Container = styled.div<{ hasIcon: boolean }>`
  display: flex;
  align-items: flex-end;

  word-break: break-word;

  > .icon {
    ${size(SECTION_ICON_SIZE)}
    fill: ${getColor("accent")};

    margin-right: ${SECTION_ICON_MARGIN};
  }

  ${props =>
    props.hasIcon &&
    `
    margin-left: ${NEGATIVE_ICON_SPACE};
  `}

  @media ${CONTENT_BREAKPOINT} {
    margin-left: 0px;
  }
`

const Title = styled.h1`
  color: ${getColor("accent")};

  font-family: Barlow Semi Condensed;
  font-weight: bold;
  font-size: 2em;
  line-height: 0.9em;

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
