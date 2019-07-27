import { GenericDescriptor } from "../types/GenericDescriptor"
import { styled } from "../../theming/themes"
import React from "react"
import { ModuleLinkMarkup } from "./ModuleLinkMarkup"
import { getTransparency } from "../../theming/helpers"
import { GenericContainer } from "./TypeDescriptorRenderer"

export interface GenericDescriptorRendererProps {
  descriptor: GenericDescriptor
}

const Container = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: solid 1px ${getTransparency("negative")};
    margin-bottom: 16px;
  }

  margin-bottom: -16px;
  padding-bottom: 16px;
`

const Name = styled.h5`
  font-weight: 500;
  font-size: 18px;
`

const Description = styled.article`
  font-weight: 600;
  font-size: 16px;

  margin-left: 8px;

  &::before {
    content: "- ";
    margin-right: 8px;
  }
`

export function GenericDescriptorRenderer(props: GenericDescriptorRendererProps) {
  const { descriptor } = props
  const { name, description } = descriptor

  const renderDescription = () => {
    if (!description) return

    return (
      <Description>
        <ModuleLinkMarkup>{description}</ModuleLinkMarkup>
      </Description>
    )
  }

  return (
    <Container>
      <Name>
        <GenericContainer>{name}</GenericContainer>
      </Name>
      {renderDescription()}
    </Container>
  )
}
