import { ClassDescriptor } from "../../types/ClassDescriptor"
import { Section } from "../../../../common/markdown/components/Section"
import React from "react"

export interface ClassDescriptorRendererProps {
  descriptor: ClassDescriptor
}

export function ClassDescriptorRenderer(props: ClassDescriptorRendererProps) {
  const { descriptor } = props

  return <Section title="Haha!">LOL</Section>
}
