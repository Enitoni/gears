import { TypeDescriptor } from "../types/TypeDescriptor"
import { styled } from "../../theming/themes"
import React from "react"
import { TypeDescriptorRenderer } from "./TypeDescriptorRenderer"
import { getTransparency } from "../../theming/helpers"
import { useScrollAnchor } from "../../../common/react/useScrollAnchor"

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
const Header = styled.header`
  display: flex;
`

const Title = styled.a`
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

export function PropertyRenderer(props: PropertyRendererProps) {
  const { name, description, type } = props
  const ref = useScrollAnchor()

  return (
    <Container id={name} ref={ref}>
      <Header>
        <Title href={`#${name}`} id={name}>
          {name}:
        </Title>
        <Type>
          <TypeDescriptorRenderer descriptor={type} />
        </Type>
      </Header>
      {description}
    </Container>
  )
}
