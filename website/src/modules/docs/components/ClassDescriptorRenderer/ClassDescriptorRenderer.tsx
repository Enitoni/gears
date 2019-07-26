import { ClassDescriptor } from "../../types/ClassDescriptor"
import { Section } from "../../../../common/markdown/components/Section"
import React from "react"
import { categorize } from "../../../../common/lang/array/categorize"
import { ConstructorDescriptorRenderer } from "./ConstructorDescriptorRenderer"
import { DescriptorKind, Descriptor } from "../../types/Descriptor"
import { categorizeDescriptorKind } from "../../helpers/categorizeDescriptorKind"
import { PropertyDescriptorList } from "../PropertyDescriptorList"

export interface ClassDescriptorRendererProps {
  descriptor: ClassDescriptor
}

export function ClassDescriptorRenderer(props: ClassDescriptorRendererProps) {
  const { descriptor } = props

  const kinds = categorizeDescriptorKind(descriptor)

  const renderConstructor = () => {
    if (kinds.Constructor && kinds.Constructor.length > 0) {
      return <ConstructorDescriptorRenderer descriptor={kinds.Constructor[0]} />
    }

    return null
  }

  const renderProperties = () => {
    if (kinds.Property && kinds.Property.length > 0) {
      return <PropertyDescriptorList descriptors={kinds.Property} />
    }

    return null
  }

  return (
    <>
      {renderConstructor()}
      {renderProperties()}
    </>
  )
}
