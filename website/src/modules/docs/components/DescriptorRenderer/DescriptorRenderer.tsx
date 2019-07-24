import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { Header, ICON_SPACE } from "./Header"
import { styled } from "../../../theming/themes"
import { Description } from "./Description"
import { InheritingRenderer } from "./InheritingRenderer"
import { Inheriting } from "../../types/Inheriting"

export interface DescriptorRendererProps {
  descriptor: ModuleDescriptor
}

const Container = styled.div`
  > .content {
    margin-top: 16px;
    margin-left: ${ICON_SPACE};
  }
`

export function DescriptorRenderer(props: DescriptorRendererProps) {
  const { descriptor } = props

  return (
    <Container>
      <Header descriptor={descriptor} />
      <div className="content">
        <InheritingRenderer descriptor={descriptor as Inheriting} />
        <Description descriptor={descriptor} />
      </div>
    </Container>
  )
}
