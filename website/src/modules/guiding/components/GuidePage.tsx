import React from "react"
import { guides } from "../guides/guide-index"
import { NotFoundPage } from "../../core/components/NotFoundPage"
import { GuideRenderer } from "./GuideRenderer"
import { useRedirect } from "../../../common/routing/hooks/useRedirect"
import { useSidebar } from "../../../common/navigation/hooks/useSidebar"
import { getGuideCategories } from "../helpers/getGuideCategories"

export interface GuidePageProps {
  slug: string
}

export function GuidePage(props: GuidePageProps) {
  const { slug } = props

  const firstGuide = guides[0]

  useRedirect("/guides", `/guides/${firstGuide.slug}`)
  useSidebar(getGuideCategories(guides))

  const guide = guides.find(guide => guide.slug === slug)

  if (!guide) {
    return <NotFoundPage />
  }

  return <GuideRenderer guide={guide} />
}
