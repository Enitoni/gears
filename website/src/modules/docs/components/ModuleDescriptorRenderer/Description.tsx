import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { styled } from "../../../theming/themes"
import { ModuleLink } from "../ModuleLink"
import { Section } from "../../../../common/markdown/components/Section"
import { ModuleLinkMarkup } from "../ModuleLinkMarkup"
import { Paragraph } from "../../../../common/markdown/components/Paragraph"

export interface DescriptionProps {
  descriptor: ModuleDescriptor
}

export function Description(props: DescriptionProps) {
  const { descriptor } = props
  const { description } = descriptor

  if (!description) return null

  return (
    <Section icon="paragraph" title="Description">
      <Paragraph>
        <ModuleLinkMarkup>{description}</ModuleLinkMarkup>
      </Paragraph>
    </Section>
  )
}
