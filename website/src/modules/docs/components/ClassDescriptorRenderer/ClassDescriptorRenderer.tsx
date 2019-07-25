import { ClassDescriptor } from "../../types/ClassDescriptor"
import { Section } from "../../../../common/markdown/components/Section"
import React from "react"
import { categorize } from "../../../../common/lang/array/categorize"
import { ConstructorDescriptorRenderer } from "./ConstructorDescriptorRenderer"
import { DescriptorKind, Descriptor } from "../../types/Descriptor"
import { categorizeDescriptorKind } from "../../helpers/categorizeDescriptorKind"

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

  return <>{renderConstructor()}</>
}
