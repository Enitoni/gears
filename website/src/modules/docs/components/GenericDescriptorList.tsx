import { GenericDescriptor } from "../types/GenericDescriptor"
import { Section } from "../../../common/markdown/components/Section"
import { GenericDescriptorRenderer } from "./GenericDescriptorRenderer"
import React from "react"

export interface GenericDescriptorListProps {
  descriptors: GenericDescriptor[]
}

export function GenericDescriptorList(props: GenericDescriptorListProps) {
  const { descriptors } = props

  return (
    <Section icon="generic" title="Generics">
      {descriptors.map(descriptor => (
        <GenericDescriptorRenderer key={descriptor.name} descriptor={descriptor} />
      ))}
    </Section>
  )
}
