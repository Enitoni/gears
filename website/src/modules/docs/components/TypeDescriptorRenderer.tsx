import React from "react"
import { TypeDescriptor } from "../types/TypeDescriptor"
import { ModuleLink } from "./ModuleLink"
import { infix } from "../../../common/lang/array/infix"
import { styled } from "../../theming/themes"
import { getSyntaxColor } from "../../theming/helpers"
import { nameToURL } from "../constants"
import { ExternalLink } from "../../../common/navigation/components/ExternalLink"

export interface TypeDescriptorRendererProps {
  descriptor: TypeDescriptor
}

const Container = styled.span`
  font-family: Fira Mono, monospace;
  word-break: break-word;

  > .intrinsic {
    color: ${getSyntaxColor("primitive")};
  }
`

export const GenericContainer = styled.span`
  font-family: Fira Mono, monospace;
  color: ${getSyntaxColor("class")};
`

const infixSpan = <T extends any>(arr: T[], text: string) =>
  infix(arr, i => <span key={i}>{text}</span>)

export function TypeDescriptorRenderer(props: TypeDescriptorRendererProps) {
  const { descriptor } = props

  const renderTypeList = (arr: TypeDescriptor[]) => {
    return arr.map((descriptor, i) => (
      <TypeDescriptorRenderer key={`${descriptor.name}-${i}`} descriptor={descriptor} />
    ))
  }

  const attachTypeArguments = (element: JSX.Element) => {
    const typeArgumentable = descriptor as { typeArguments?: TypeDescriptor[] }
    const { typeArguments } = typeArgumentable

    if (typeArguments) {
      const infixedArguments = infixSpan(renderTypeList(typeArguments), ", ")

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

  if (Object.keys(nameToURL).includes(descriptor.name)) {
    const url = nameToURL[descriptor.name]

    return attachTypeArguments(
      <Container>
        <ExternalLink className="intrinsic" to={url}>
          {descriptor.name}
        </ExternalLink>
      </Container>
    )
  }

  if (descriptor.type === "array") {
    return (
      <Container>
        <TypeDescriptorRenderer descriptor={descriptor.elementType} />
        <ExternalLink className="intrinsic" to={nameToURL["array"]}>
          []
        </ExternalLink>
      </Container>
    )
  }

  if (
    ["typeParameter", "unknown"].includes(descriptor.type) ||
    (descriptor.name && descriptor.name.length === 1)
  ) {
    return (
      <Container>
        <GenericContainer>{descriptor.name}</GenericContainer>
      </Container>
    )
  }

  if (descriptor.type === "reference") {
    return attachTypeArguments(
      <Container>
        <ModuleLink name={descriptor.name} />
      </Container>
    )
  }

  if (descriptor.type === "intrinsic") {
    // TODO: Make this link to MDN
    return <Container>{descriptor.name}</Container>
  }

  if (descriptor.type === "intersection") {
    return <Container>{infixSpan(renderTypeList(descriptor.types), " & ")}</Container>
  }

  if (descriptor.type === "union") {
    return <Container>{infixSpan(renderTypeList(descriptor.types), " | ")}</Container>
  }

  if (descriptor.type === "tuple") {
    const renderTuplePart = (part: string) => (
      <ExternalLink className="intrinsic" to={nameToURL["tuple"]}>
        {part}
      </ExternalLink>
    )

    return (
      <Container>
        {renderTuplePart("[")}
        {infixSpan(renderTypeList(descriptor.elements), ", ")}
        {renderTuplePart("]")}
      </Container>
    )
  }

  return <Container>unknown type</Container>
}
