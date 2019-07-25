import React from "react"
import { ModuleDescriptor } from "../../types/ModuleDescriptor"
import { Heading, ICON_SPACE } from "../../../../common/markdown/components/Heading"
import { styled } from "../../../theming/themes"
import { Description } from "./Description"
import { InheritingRenderer } from "./InheritingRenderer"
import { Inheriting } from "../../types/Inheriting"
import { ExampleRenderer } from "./ExampleRenderer"
import { Alert } from "../../../../common/markdown/components/Alert"
import { kindToIconMap } from "../../constants"

export interface DescriptorRendererProps {
  descriptor: ModuleDescriptor
}

const Container = styled.div`
  flex: 1;

  > .content {
    margin-left: ${ICON_SPACE};
  }
`

const SpaceContainer = styled.div`
  margin-top: 32px;
`

export function DescriptorRenderer(props: DescriptorRendererProps) {
  const { descriptor } = props

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

  return (
    <Container>
      <div className="content">
        <Heading icon={kindToIconMap[descriptor.kind]}>{descriptor.name}</Heading>
        <InheritingRenderer descriptor={descriptor as Inheriting} />
        {renderWarningIfInternal()}
        <Description descriptor={descriptor} />
        <ExampleRenderer descriptor={descriptor} />
      </div>
    </Container>
  )
}
