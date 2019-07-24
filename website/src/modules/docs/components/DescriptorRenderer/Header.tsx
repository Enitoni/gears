import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { styled } from "../../../theming/themes"
import { Icon } from "../../../../common/icon/components/Icon"
import { kindToIconMap } from "../../constants"
import { size } from "polished"
import { getColor, getFontColor } from "../../../theming/helpers"
import { InheritingRenderer } from "./InheritingRenderer"
import { Inheriting } from "../../types/Inheriting"

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

`

const Title = styled.h2`
  color: ${getColor("accent")};

  font-family: Barlow Semi Condensed;
  font-weight: bold;
  font-size: 48px;
  line-height: 27px;

  margin-right: 8px;
`

export function Header(props: HeaderProps) {
  const { descriptor } = props

  return (
    <Container>
      <Icon className="icon" name={kindToIconMap[descriptor.kind]} />
      <Title>{descriptor.name}</Title>
    </Container>
  )
}
