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
  & ~ & {
    border-top: solid 1px ${getTransparency("negative")};

    padding-top: 16px;
    margin-top: 16px;
  }
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
    <Container>
      <Header>
        <Title ref={ref} href={`#${name}`} id={name}>
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
