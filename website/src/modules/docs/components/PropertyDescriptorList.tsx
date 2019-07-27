import { PropertyDescriptor } from "../types/PropertyDescriptor"
import { Section } from "../../../common/markdown/components/Section"
import React from "react"
import { PropertyRenderer } from "./PropertyRenderer"

export interface PropertyDescriptorListProps {
  descriptors: PropertyDescriptor[]
}

export function PropertyDescriptorList(props: PropertyDescriptorListProps) {
  const { descriptors } = props

  return (
    <Section icon="circledP" title="Properties">
      {descriptors.map(({ name, type, description }) => (
        <PropertyRenderer description={description} key={name} name={name} type={type} />
      ))}
    </Section>
  )
}
