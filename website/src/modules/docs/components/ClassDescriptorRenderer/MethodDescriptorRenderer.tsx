import React from "react"
import { styled } from "../../../theming/themes"
import { useScrollAnchor } from "../../../../common/react/useScrollAnchor"
import { ModuleLinkMarkup } from "../ModuleLinkMarkup"
import { TypeDescriptorRenderer } from "../TypeDescriptorRenderer"
import { getTransparency, getColor } from "../../../theming/helpers"
import { MethodDescriptor } from "../../types/ClassDescriptor"
import { PropertyDescriptorList } from "../PropertyDescriptorList"
import { PropertyRenderer } from "../PropertyRenderer"

export interface MethodDescriptorRendererProps {
  descriptor: MethodDescriptor
}

const Container = styled.div`
  & ~ & {
    border-top: solid 1px ${getTransparency("negative")};

    padding-top: 24px;
    margin-top: 24px;
  }
`

const Title = styled.a`
  color: inherit;

  font-family: Fira Mono, monospace;
  font-weight: 500;
  font-size: 18px;
`

const Type = styled.span`
  margin-top: 8px;

  font-family: Fira Mono, monospace;
  font-weight: 500;
  font-size: 18px;

  ::before {
    content: ": ";
  }
`

const Description = styled.div`
  margin-top: 24px;

  font-weight: 600;
  font-size: 16px;
`

const Paremeters = styled.div`
  margin-top: 24px;
  padding-bottom: 16px;

  padding-left: 24px;
  border-left: solid 2px ${getColor("accent")};
`

const ParametersHeading = styled.h5`
  margin-bottom: 16px;
  color: ${getColor("accent")};

  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
`

export function MethodDescriptorRenderer(props: MethodDescriptorRendererProps) {
  const { descriptor } = props
  const { name, description } = descriptor
  const { type, parameters = [] } = descriptor.signatures[0]

  const ref = useScrollAnchor()

  const renderDescription = () => {
    if (!description) return

    return (
      <Description>
        <ModuleLinkMarkup>{description}</ModuleLinkMarkup>
      </Description>
    )
  }

  const renderParemeters = () => {
    if (parameters.length === 0) return

    return (
      <Paremeters>
        <ParametersHeading>Parameters</ParametersHeading>
        {parameters.map(({ name, type }) => (
          <PropertyRenderer name={name} type={type} />
        ))}
      </Paremeters>
    )
  }

  const renderName = () => {
    const joinedParams = parameters.map(x => x.name).join(", ")
    return `${name}(${joinedParams})`
  }

  return (
    <Container>
      <Title ref={ref} href={`#${name}`} id={name}>
        {renderName()}
        <Type>
          <TypeDescriptorRenderer descriptor={type} />
        </Type>
      </Title>
      {renderDescription()}
      {renderParemeters()}
    </Container>
  )
}
