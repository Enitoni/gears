import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { styled } from "../../../theming/themes"
import { ModuleLink } from "../ModuleLink"
import { Section } from "../../../../common/markdown/components/Section"
import { ModuleLinkMarkup } from "../ModuleLinkMarkup"

export interface DescriptionProps {
  descriptor: ModuleDescriptor
}

const Container = styled.div`
  font-size: 18px;
`

export function Description(props: DescriptionProps) {
  const { descriptor } = props
  const { description } = descriptor

  if (!description) return null

  return (
    <Section icon="paragraph" title="Description">
      <Container>
        <ModuleLinkMarkup>{description}</ModuleLinkMarkup>
      </Container>
    </Section>
  )
}
