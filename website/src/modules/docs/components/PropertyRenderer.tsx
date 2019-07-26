import { TypeDescriptor } from "../types/TypeDescriptor"
import { styled } from "../../theming/themes"
import React from "react"
import { TypeDescriptorRenderer } from "./TypeDescriptorRenderer"
import { getTransparency } from "../../theming/helpers"

export interface PropertyRendererProps {
  name: string
  description?: string
  type: TypeDescriptor
}

const Container = styled.div`
  & ~ & {
    border-top: solid 1px ${getTransparency("negative")};

    padding-top: 16px;
    margin-top: 16px;
  }
`
// can i break thing?
const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

const Title = styled.a`
  display: block;
  color: inherit;

  font-family: Fira Mono, monospace;
  font-weight: 500;
  font-size: 18px;
`

const Type = styled.span`
  font-size: 16px;
`

export function PropertyRenderer(props: PropertyRendererProps) {
  const { name, description, type } = props

  return (
    <Container>
      <Header>
        <Title href={`#${name}`} id={name}>
          {name}
        </Title>
        <Type>
          <TypeDescriptorRenderer descriptor={type} />
        </Type>
      </Header>
      {description}
    </Container>
  )
}
