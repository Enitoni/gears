import { Guide } from "../types/Guide"
import { useMeta } from "../../core/hooks/useMeta"
import React from "react"
import { Heading } from "../../../common/markdown/components/Heading"
import { Content } from "../../../common/markdown/components/Content"

export interface GuideRendererProps {
  guide: Guide
}

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
      {render()}
    </Content>
  )
}
