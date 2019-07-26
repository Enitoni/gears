import React from "react"
import { TypeDescriptor } from "../types/TypeDescriptor"
import { ModuleLink } from "./ModuleLink"
import { infix } from "../../../common/lang/array/infix"
import { styled } from "../../theming/themes"

export interface TypeDescriptorRendererProps {
  descriptor: TypeDescriptor
}

const Container = styled.span`
  font-family: Fira Mono, monospace;
`

export function TypeDescriptorRenderer(props: TypeDescriptorRendererProps) {
  const { descriptor } = props

  const attachTypeArguments = (element: JSX.Element) => {
    const typeArgumentable = descriptor as { typeArguments?: TypeDescriptor[] }
    const { typeArguments } = typeArgumentable

    if (typeArguments) {
      const infixedArguments = infix(
        typeArguments.map((x, i) => (
          <TypeDescriptorRenderer key={`${x.name}-${i}`} descriptor={x} />
        )),
        ", "
      )

      return (
        <Container>
          {element}
          {"<"}
          {infixedArguments}
          {">"}
        </Container>
      )
    }

    return element
  }

  if (descriptor.type === "array") {
    return (
      <Container>
        <TypeDescriptorRenderer descriptor={descriptor.elementType} />
        []
      </Container>
    )
  }

  if (descriptor.type === "reference") {
    return attachTypeArguments(<ModuleLink name={descriptor.name} />)
  }

  if (["typeParameter", "unknown"].includes(descriptor.type)) {
    return <Container>{descriptor.name}</Container>
  }

  if (descriptor.type === "intrinsic") {
    // TODO: Make this link to MDN
    return <Container>{descriptor.name}</Container>
  }

  if (descriptor.type === "intersection") {
    return (
      <Container>
        {infix(
          descriptor.types.map(descriptor => (
            <TypeDescriptorRenderer key={descriptor.name} descriptor={descriptor} />
          )),
          <span> & </span>
        )}
      </Container>
    )
  }

  return null
}
