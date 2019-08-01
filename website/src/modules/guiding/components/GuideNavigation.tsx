import { Guide } from "../types/Guide"
import { guides } from "../guides/guide-index"
import { styled } from "../../theming/themes"
import { IconType } from "../../../common/icon/types/IconType"
import React from "react"
import { Icon } from "../../../common/icon/components/Icon"
import { size } from "polished"
import { getColor, getTransparency } from "../../theming/helpers"
import { useRouteLink } from "../../../common/routing/hooks/useRouteLink"

export interface GuideNavigationProps {
  guide: Guide
}

const Container = styled.div`
  padding-top: 24px;

  margin-top: 24px;

  border-top: solid 1px ${getTransparency("negative")};
  display: flex;

  > .space {
    flex: 1;
  }
`

const LinkContainer = styled.a`
  margin: 0px -16px;
  display: flex;
  align-items: center;

  > .icon {
    ${size(24)};

    fill: ${getColor("accent")};
    margin: 0px 16px;
  }

  > .title {
    font-size: 1.2em;
    margin-bottom: 1px;
  }
`

export function GuideLink(props: { guide: Guide; type: "next" | "previous" }) {
  const { guide, type } = props

  const to = `/guides/${guide.slug}`
  const [_, click] = useRouteLink(to)

  const renderTitle = (used: "next" | "previous") => {
    if (used !== type) return

    return <span className="title">{guide.title}</span>
  }

  return (
    <LinkContainer href={to} onClick={click}>
      {renderTitle("next")}
      <Icon className="icon" name={type === "next" ? "rightArrow" : "leftArrow"} />
      {renderTitle("previous")}
    </LinkContainer>
  )
}

export function GuideNavigation(props: GuideNavigationProps) {
  const { guide } = props

  const index = guides.findIndex(g => g.slug === guide.slug)

  const nextGuide = guides[index + 1]
  const prevGuide = guides[index - 1]

  const renderNext = () => {
    if (!nextGuide) return
    return <GuideLink type="next" guide={nextGuide} />
  }

  const renderPrev = () => {
    if (!prevGuide) return
    return <GuideLink type="previous" guide={prevGuide} />
  }

  return (
    <Container>
      {renderPrev()}
      <div className="space" />
      {renderNext()}
    </Container>
  )
}
