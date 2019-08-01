import { styled } from "../../../modules/theming/themes"
import React from "react"
import { useStores } from "../../state/hooks/useStores"
import { CategoryNavigation } from "./CategoryNavigation"
import { useObserver } from "mobx-react-lite"
import { NavLink } from "../../../modules/core/components/NavLink"
import { getTransparency, getColor, getDuration } from "../../../modules/theming/helpers"
import { cover } from "polished"
import { HEADER_HEIGHT } from "../../../modules/core/constants"
import { SIDEBAR_WIDTH, SIDEBAR_BREAKPOINT, SIDEBAR_BREAKPOINT_WIDTH } from "../constants"
import { useIsomorphicQuery } from "../../react/useIsomorphicQuery"
import { useIsomorphicEffect } from "../../react/useIsomorphicEffect"

const Container = styled.div<{ open: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: ${SIDEBAR_WIDTH};
  margin-left: 32px;

  ${props =>
    props.open === false &&
    `
    display: none;
  `}

  @media ${SIDEBAR_BREAKPOINT} {
    pointer-events: all;
    z-index: 1;

    position: fixed;
    margin: 0px;

    left: 0px;
    right: 0px;
    top: ${HEADER_HEIGHT};
    bottom: 0px;

    width: 100%;

    ${props =>
      props.open === false &&
      `
      display: block;
      pointer-events: none;
    `}
  }
`

const Fixed = styled.div<{ open: boolean }>`
  background: ${getColor("primary")};
  border-left: solid 1px ${getTransparency("negative")};

  padding: 0px 32px;
  width: ${SIDEBAR_WIDTH};

  position: fixed;
  top: ${parseInt(HEADER_HEIGHT) + 32}px;
  bottom: 32px;

  overflow-y: auto;

  transition: ${getDuration("normal")} ease;
  transition-property: transform;

  @media ${SIDEBAR_BREAKPOINT} {
    position: absolute;

    top: 0px;
    right: 0px;
    bottom: 0px;

    padding: 32px;
    padding-right: 0px;

    transform: translateX(100%);

    ${props =>
      props.open &&
      `
      transform: translateX(0%);
    `}
  }
`

const Filter = styled.div<{ open: boolean }>`
  display: none;
  ${cover()}

  opacity: 0;
  background: ${getTransparency("negative")};

  transition: ${getDuration("normal")} ease;
  transition-property: opacity;

  pointer-events: none;

  @media ${SIDEBAR_BREAKPOINT} {
    display: block;

    ${props =>
      props.open &&
      `
      opacity: 1;
      pointer-events: all;
    `}
  }
`

const Navigation = styled.nav`
  padding-bottom: 24px;
  margin-bottom: 24px;

  border-bottom: solid 1px ${getTransparency("negative")};
`

export function Sidebar() {
  const { sidebarStore, documentationStore } = useStores()
  const { latestVersion } = documentationStore

  const mobile = useIsomorphicQuery({
    value: SIDEBAR_BREAKPOINT_WIDTH,
    type: "max",
  })

  useIsomorphicEffect(() => {
    sidebarStore.open = !mobile

    if (mobile) {
      sidebarStore.autoDismiss = true
    }
  }, [mobile])

  return useObserver(() => (
    <>
      <Container open={sidebarStore.open}>
        <Filter open={sidebarStore.open} onClick={() => (sidebarStore.open = false)} />
        <Fixed open={sidebarStore.open}>
          <Navigation>
            <NavLink icon="home" to="/">
              Home
            </NavLink>
            <NavLink icon="compass" to="/guides" activeTo="/guides(/*)">
              Guides
            </NavLink>
            <NavLink icon="book" to={`/docs/${latestVersion}`} activeTo="/docs(/*)">
              Docs
            </NavLink>
          </Navigation>
          <CategoryNavigation categories={sidebarStore.categories} />
        </Fixed>
      </Container>
    </>
  ))
}
