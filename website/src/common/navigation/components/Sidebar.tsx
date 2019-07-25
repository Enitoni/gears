import { styled } from "../../../modules/theming/themes"
import React from "react"
import { HEADER_HEIGHT } from "../../../modules/core/components/Header"
import { useStores } from "../../state/hooks/useStores"
import { CategoryNavigation } from "./CategoryNavigation"
import { useObserver } from "mobx-react-lite"
import { NavLink } from "../../../modules/core/components/NavLink"
import { getTransparency } from "../../../modules/theming/helpers"

const SIDEBAR_WIDTH = "320px"

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
`

const Fixed = styled.div`
  border-left: solid 1px ${getTransparency("negative")};

  padding: 0px 32px;
  width: ${SIDEBAR_WIDTH};

  position: fixed;
  top: ${parseInt(HEADER_HEIGHT) + 32}px;
  bottom: 32px;

  overflow-y: auto;
`

const Navigation = styled.nav`
  padding-bottom: 24px;
  margin-bottom: 24px;

  border-bottom: solid 1px ${getTransparency("negative")};
`

export function Sidebar() {
  const { sidebarStore, documentationStore } = useStores()
  const { latestVersion } = documentationStore

  return useObserver(() => (
    <>
      <Container open={sidebarStore.open}>
        <Fixed>
          <Navigation>
            <NavLink icon="home" to="/">
              Home
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
