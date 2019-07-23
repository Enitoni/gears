import { ModuleDescriptor, ModuleKind } from "../../types/ModuleDescriptor"
import React from "react"
import { Header, ICON_SPACE } from "./Header"
import { styled } from "../../../theming/themes"
import { Description } from "./Description"

export interface DescriptorRendererProps {
  descriptor: ModuleDescriptor<ModuleKind>
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
        <Description descriptor={descriptor} />
      </div>
    </Container>
  )
}
