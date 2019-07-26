import React from "react"
import { FunctionDescriptor } from "../types/FunctionDescriptor"
import { Section } from "../../../common/markdown/components/Section"
import { PropertyRenderer } from "./PropertyRenderer"
import { Subsection } from "../../../common/markdown/components/Subsection"
import { getCallSignatureString } from "../helpers/getCallSignatureString"
import { Code } from "../../../common/markdown/components/Code"

export interface FunctionDescriptorRendererProps {
  descriptor: FunctionDescriptor
}

export function FunctionDescriptorRenderer(props: FunctionDescriptorRendererProps) {
  const { descriptor } = props
  const signature = descriptor.signatures[0] || {}
  const { parameters = [] } = signature

  const renderSignature = () => {
    return <Code>{getCallSignatureString(signature)}</Code>
  }

  const renderParams = () => {
    if (parameters.length === 0) return

    return (
      <Subsection title="Parameters">
        {parameters.map(({ type, name }) => (
          <PropertyRenderer key={name} type={type} name={name} />
        ))}
      </Subsection>
    )
  }

  return (
    <>
      <Section icon="doubleParens" title="Usage">
        {renderSignature()}
        {renderParams()}
      </Section>
    </>
  )
}
