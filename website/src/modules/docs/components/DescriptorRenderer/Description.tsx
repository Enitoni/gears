import { ModuleDescriptor, ModuleKind } from "../../types/ModuleDescriptor"
import { styled } from "../../../theming/themes"
import React from "react"

export interface DescriptionProps {
  descriptor: ModuleDescriptor<ModuleKind>
}

const Container = styled.div`
  font-size: 18px;
`

export function Description(props: DescriptionProps) {
  const { descriptor } = props

  return <Container>{descriptor.description}</Container>
}
