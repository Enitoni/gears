import { Guide } from "../types/Guide"
import { useMeta } from "../../core/hooks/useMeta"
import React from "react"
import { Heading } from "../../../common/markdown/components/Heading"
import { Content } from "../../../common/markdown/components/Content"
import { styled } from "../../theming/themes"

export interface GuideRendererProps {
  guide: Guide
}

const Subtitle = styled.h2`
  margin-top: -8px;
  margin-bottom: 16px;
`

export function GuideRenderer(props: GuideRendererProps) {
  const { guide } = props
  const { title, description, render } = guide

  useMeta({
    title,
    description,
  })

  return (
    <Content>
      <Heading icon="book">{title}</Heading>
      <Subtitle>{description}</Subtitle>
      {render()}
    </Content>
  )
}
