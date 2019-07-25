import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { styled } from "../../../theming/themes"
import { ModuleLink } from "../ModuleLink"
import { Section } from "../../../../common/markdown/components/Section"

export interface DescriptionProps {
  descriptor: ModuleDescriptor
}

const Container = styled.div`
  font-size: 18px;
`

export function Description(props: DescriptionProps) {
  const { descriptor } = props
  const { description } = descriptor

  const renderSection = (desc: React.ReactNode) => (
    <Section icon="paragraph" title="Description">
      <Container>{desc}</Container>
    </Section>
  )

  if (!description) return null

  const parts = description.split(/\[\[\w+]]/g)
  const matches = description.match(/\[\[\w+]]/g)

  if (!matches) return renderSection(description)

  let finalDescription = []

  for (const [i, part] of parts.entries()) {
    finalDescription.push(part)

    if (i === matches.length) break

    const match = matches[i]
    const [, moduleName] = /\[\[(\w+)]]/.exec(match)!

    finalDescription.push(<ModuleLink key={`${moduleName}-${i}`} name={moduleName} />)
  }

  return renderSection(finalDescription)
}
