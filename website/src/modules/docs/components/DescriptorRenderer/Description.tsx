import { ModuleDescriptor, ModuleKind } from "../../types/ModuleDescriptor"
import { styled } from "../../../theming/themes"
import React from "react"
import { Link } from "../../../../common/navigation/components/Link"
import { ModuleLink } from "../ModuleLink"

export interface DescriptionProps {
  descriptor: ModuleDescriptor<ModuleKind>
}

const Container = styled.div`
  font-size: 18px;
`

export function Description(props: DescriptionProps) {
  const { descriptor } = props
  const { description } = descriptor

  if (!description) return null

  const parts = description.split(/\[\[\w+]]/g)
  const matches = description.match(/\[\[\w+]]/g)

  if (!matches) return <Container>{description}</Container>

  let finalDescription = []

  for (const [i, part] of parts.entries()) {
    finalDescription.push(part)

    if (i === matches.length) break

    const match = matches[i]
    const [, moduleName] = /\[\[(\w+)]]/.exec(match)!

    finalDescription.push(<ModuleLink key={`${moduleName}-${i}`} name={moduleName} />)
  }

  return <Container>{finalDescription}</Container>
}
