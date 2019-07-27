import React from "react"
import { ClassDescriptor } from "../../types/ClassDescriptor"
import { Section } from "../../../../common/markdown/components/Section"
import { ConstructorDescriptorRenderer } from "./ConstructorDescriptorRenderer"
import { categorizeDescriptorKind } from "../../helpers/categorizeDescriptorKind"
import { PropertyDescriptorList } from "../PropertyDescriptorList"
import { MethodDescriptorRenderer } from "./MethodDescriptorRenderer"
import { filterMethod } from "../../helpers/filterMethod"

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
    const methods = kinds.Method && kinds.Method.filter(filterMethod)

    if (methods.length > 0) {
      return (
        <Section title="Methods" icon="doubleParens">
          {methods.map(descriptor => (
            <MethodDescriptorRenderer key={descriptor.name} descriptor={descriptor} />
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
