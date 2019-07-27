import { TypeDescriptor } from "../types/TypeDescriptor"
import { styled } from "../../theming/themes"
import React from "react"
import { TypeDescriptorRenderer } from "./TypeDescriptorRenderer"
import { getTransparency } from "../../theming/helpers"
import {
  useScrollAnchor,
  highlightedScrollAnchor
} from "../../../common/react/useScrollAnchor"
import { ModuleLinkMarkup } from "./ModuleLinkMarkup"

export interface PropertyRendererProps {
  name: string
  description?: string
  type: TypeDescriptor
}

const Container = styled.div`
  &:not(:last-child) {
    border-bottom: solid 1px ${getTransparency("negative")};

    margin-bottom: 16px;
  }

  margin-bottom: -16px;
  padding-bottom: 16px;
`
// can i break thing?
const Header = styled.header<{ highlighted: boolean }>`
  ${props => props.highlighted && highlightedScrollAnchor(props.theme)}
  display: flex;
`

const Title = styled.h5`
  display: block;
  color: inherit;

  font-family: Fira Mono, monospace;
  font-weight: 500;
  font-size: 18px;
`

const Type = styled.span`
  margin-left: 8px;
  font-size: 18px;
`

const Description = styled.div`
  margin-top: 16px;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.03em;
`

export function PropertyRenderer(props: PropertyRendererProps) {
  const { name, description, type } = props
  const [ref, active] = useScrollAnchor(`#${name}`)

  const renderDescription = () => {
    if (!description) return

    return (
      <Description>
        <ModuleLinkMarkup>{description}</ModuleLinkMarkup>
      </Description>
    )
  }

  return (
    <Container id={name} ref={ref}>
      <Header highlighted={active}>
        <Title>{name}:</Title>
        <Type>
          <TypeDescriptorRenderer descriptor={type} />
        </Type>
      </Header>
      {renderDescription()}
    </Container>
  )
}
