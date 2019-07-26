import React from "react"
import { ClassDescriptor } from "../../types/ClassDescriptor"
import { Section } from "../../../../common/markdown/components/Section"
import { ConstructorDescriptorRenderer } from "./ConstructorDescriptorRenderer"
import { categorizeDescriptorKind } from "../../helpers/categorizeDescriptorKind"
import { PropertyDescriptorList } from "../PropertyDescriptorList"
import { MethodDescriptorRenderer } from "./MethodDescriptorRenderer"

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

  const renderMethods = () => {
    if (kinds.Method && kinds.Method.length > 0) {
      return (
        <Section title="Methods" icon="doubleParens">
          {kinds.Method.filter(x => !x.inheritedFrom).map(descriptor => (
            <MethodDescriptorRenderer descriptor={descriptor} />
          ))}
        </Section>
      )
    }

    return null
  }

  return (
    <>
      {renderConstructor()}
      {renderProperties()}
      {renderMethods()}
    </>
  )
}
