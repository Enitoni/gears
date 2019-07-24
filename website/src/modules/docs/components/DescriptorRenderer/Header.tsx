import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { styled } from "../../../theming/themes"
import { Icon } from "../../../../common/icon/components/Icon"
import { kindToIconMap } from "../../constants"
import { size } from "polished"
import { getColor } from "../../../theming/helpers"

export interface HeaderProps {
  descriptor: ModuleDescriptor
}

export const ICON_SPACE = 32 * 2 + "px"

const Container = styled.div`
  display: flex;

  > .icon {
    ${size(32)}
    fill: ${getColor("accent")};

    margin-right: 32px;
  }

  > .title {
    color: ${getColor("accent")};

    font-family: Barlow Semi Condensed;
    font-weight: bold;
    font-size: 48px;
    line-height: 27px;
  }
`

export function Header(props: HeaderProps) {
  const { descriptor } = props

  return (
    <Container>
      <Icon className="icon" name={kindToIconMap[descriptor.kind]} />
      <h2 className="title">{descriptor.name}</h2>
    </Container>
  )
}
