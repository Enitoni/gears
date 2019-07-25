import { styled } from "../../../modules/theming/themes"
import React from "react"
import { IconType } from "../../icon/types/IconType"
import { Icon } from "../../icon/components/Icon"
import { size } from "polished"

export interface SectionProps {
  title: string
  children?: React.ReactNode
  icon?: IconType
}

export const SECTION_ICON_SIZE = "24px"
export const SECTION_ICON_MARGIN = "16px"

const Container = styled.section<{ hasIcon: boolean }>`
  margin-top: 32px;

  display: flex;
  align-items: center;

  > .icon {
    ${size(SECTION_ICON_SIZE)}
    margin-right: 16px;
  }

  ${props =>
    props.hasIcon &&
    `
  margin-left: -${parseInt(SECTION_ICON_SIZE) + parseInt(SECTION_ICON_MARGIN)}px;
  `}

  margin-bottom: 16px;
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 24px;
`

export function Section(props: SectionProps) {
  const { icon, title, children } = props

  const renderIcon = () => {
    if (!icon) return null

    return <Icon className="icon" name={icon} />
  }

  return (
    <>
      <Container hasIcon={!!icon}>
        {renderIcon()}
        <Title>{title}</Title>
      </Container>
      {children}
    </>
  )
}
