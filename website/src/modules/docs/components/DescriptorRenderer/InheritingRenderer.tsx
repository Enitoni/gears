import { TypeDescriptor } from "../../types/TypeDescriptor"
import { styled } from "../../../theming/themes"
import { getFontColor } from "../../../theming/helpers"
import React from "react"
import { infix } from "../../../../common/lang/array/infix"
import { TypeDescriptorRenderer } from "./TypeDescriptorRenderer"
import { Inheriting } from "../../types/Inheriting"

export interface InheritingRendererProps {
  descriptor: Inheriting
}

const Container = styled.div`
  color: ${getFontColor("muted")};

  margin-top: 16px;
  font-size: 18px;
`

const Comma = styled.span`
  margin-right: 8px;
`

const Part = styled.div`
  > .type {
    margin-right: 8px;
  }
`

export function InheritingRenderer(props: InheritingRendererProps) {
  const { descriptor } = props
  const { extendedTypes = [], implementedTypes = [] } = descriptor

  const renderedParts: React.ReactNode[] = []
  const comma = <Comma>,</Comma>

  const renderPart = (arr: TypeDescriptor[], type: string) => {
    return (
      <Part key={type}>
        <span className="type">{type}</span>
        {infix(
          arr.map((x, i) => (
            <TypeDescriptorRenderer key={`${x.name}-${i}`} descriptor={x} />
          )),
          comma
        )}
      </Part>
    )
  }

  if (extendedTypes.length > 0) {
    renderedParts.push(renderPart(extendedTypes, "extends"))
  }

  if (implementedTypes.length > 0) {
    renderedParts.push(renderPart(implementedTypes, "implements"))
  }

  if (extendedTypes.length === 0 && implementedTypes.length === 0) {
    return null
  }

  return <Container>{renderedParts}</Container>
}
