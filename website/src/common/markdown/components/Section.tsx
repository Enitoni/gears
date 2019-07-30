import { styled } from "../../../modules/theming/themes"
import React from "react"
import { IconType } from "../../icon/types/IconType"
import { Icon } from "../../icon/components/Icon"
import { size } from "polished"
import { CONTENT_BREAKPOINT } from "./Content"
import { getTransparency } from "../../../modules/theming/helpers"
import { POSITIVE_ICON_SPACE, NEGATIVE_ICON_SPACE } from "./Heading"

export interface SectionProps {
  title: string
  children?: React.ReactNode
  icon?: IconType
}

export const SECTION_ICON_SIZE = "1.5em"
export const SECTION_ICON_MARGIN = "16px"

const Container = styled.section`
  margin-top: 32px;

  @media ${CONTENT_BREAKPOINT} {
    margin-left: -32px;
    margin-right: -32px;

    padding: 0px 32px;

    & ~ & {
      border-top: solid 1px ${getTransparency("negative")};
      padding-top: 24px;
    }
  }
`

const Header = styled.header<{ hasIcon: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  > .icon {
    ${size(SECTION_ICON_SIZE)}
    margin-right: 16px;
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
      <Container>
        <Header hasIcon={!!icon}>
          {renderIcon()}
          <Title>{title}</Title>
        </Header>
        <div>{children}</div>
      </Container>
    </>
  )
}
