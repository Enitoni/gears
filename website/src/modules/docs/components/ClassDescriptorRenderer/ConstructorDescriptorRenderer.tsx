import { ConstructorDescriptor } from "../../types/ClassDescriptor"
import { Section } from "../../../../common/markdown/components/Section"
import React from "react"
import { Alert } from "../../../../common/markdown/components/Alert"
import { ModuleLinkMarkup } from "../ModuleLinkMarkup"
import { getConstructorSignatureString } from "../../helpers/getConstructorSignatureString"
import { Code } from "../../../../common/markdown/components/Code"

export interface ConstructorDescriptorRendererProps {
  descriptor: ConstructorDescriptor
}

export function ConstructorDescriptorRenderer(props: ConstructorDescriptorRendererProps) {
  const { descriptor } = props

  const renderWarning = () => {
    if (!descriptor.warning) return null

    return (
      <Alert type="warning">
        <ModuleLinkMarkup>{descriptor.warning}</ModuleLinkMarkup>
      </Alert>
    )
  }

  const renderSignatures = () => {
    const signatures = descriptor.signatures
      .map(signature => getConstructorSignatureString(signature))
      .join("\n")

    return <Code>{signatures}</Code>
  }

  return (
    <Section title="Constructor" icon="doubleParens">
      {renderWarning()}
      {renderSignatures()}
    </Section>
  )
}
