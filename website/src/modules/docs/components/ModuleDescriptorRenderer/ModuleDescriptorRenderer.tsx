import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { Heading } from "../../../../common/markdown/components/Heading"
import { styled } from "../../../theming/themes"
import { Description } from "./Description"
import { InheritingRenderer } from "./InheritingRenderer"
import { Inheriting } from "../../types/Inheriting"
import { ExampleRenderer } from "./ExampleRenderer"
import { Alert } from "../../../../common/markdown/components/Alert"
import { kindToIconMap, kindToThumbMap } from "../../constants"
import { ClassDescriptorRenderer } from "../ClassDescriptorRenderer/ClassDescriptorRenderer"
import { InterfaceDescriptorRenderer } from "../InterfaceDescriptorRenderer"
import { FunctionDescriptorRenderer } from "../FunctionDescriptorRenderer"
import { Genericing } from "../../types/Genericing"
import { GenericDescriptorList } from "../GenericDescriptorList"
import { Content } from "../../../../common/markdown/components/Content"
import { useMeta } from "../../../core/hooks/useMeta"

export interface ModuleDescriptorRendererProps {
  descriptor: ModuleDescriptor
}

const SpaceContainer = styled.div`
  margin-top: 32px;
`

export function ModuleDescriptorRenderer(props: ModuleDescriptorRendererProps) {
  const { descriptor } = props
  const { name, description = "No description provided" } = descriptor

  useMeta({
    title: name,
    description: description.replace(/[\[\]]/g, ""),
    thumb: kindToThumbMap[descriptor.kind],
  })

  const renderWarningIfInternal = () => {
    if (descriptor.category !== "Internal") return null

    return (
      <SpaceContainer>
        <Alert type="warning">
          {
            "This is an internal module. Do not use this in your codebase as it may change or be removed entirely without warning in future versions of Gears."
          }
        </Alert>
      </SpaceContainer>
    )
  }

  const renderGenerics = () => {
    const genericable = descriptor as Genericing
    const { generics } = genericable

    if (generics && generics.length > 0) {
      return <GenericDescriptorList descriptors={generics} />
    }
  }

  const renderDescriptor = () => {
    if (descriptor.kind === "Class")
      return <ClassDescriptorRenderer descriptor={descriptor} />

    if (descriptor.kind === "Interface")
      return <InterfaceDescriptorRenderer descriptor={descriptor} />

    if (descriptor.kind === "Function")
      return <FunctionDescriptorRenderer descriptor={descriptor} />

    return null
  }

  return (
    <Content>
      <Heading icon={kindToIconMap[descriptor.kind]}>{descriptor.name}</Heading>
      <InheritingRenderer descriptor={descriptor as Inheriting} />
      {renderWarningIfInternal()}
      <Description descriptor={descriptor} />
      <ExampleRenderer descriptor={descriptor} />
      {renderGenerics()}
      {renderDescriptor()}
    </Content>
  )
}
