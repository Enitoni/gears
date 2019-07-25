import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { Section } from "../../../../common/markdown/components/Section"
import { Code } from "../../../../common/markdown/components/Code"

export interface ExampleRendererProps {
  descriptor: ModuleDescriptor
}

export function ExampleRenderer(props: ExampleRendererProps) {
  const { descriptor } = props

  if (!descriptor.example) return null

  return (
    <Section title="Example">
      <Code>{descriptor.example}</Code>
    </Section>
  )
}
