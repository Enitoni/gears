import React from "react"
import { styled } from "../../theming/themes"
import { getColor, getTransparency } from "../../theming/helpers"
import { MAX_BODY_WIDTH, BODY_PADDING } from "../constants"
import { IconButton } from "../../../common/button/components/IconButton"
import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

export const HEADER_HEIGHT = "56px"

const Container = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;

  background: ${getColor("primary")};
  border-bottom: solid 1px ${getTransparency("negative")};

  display: flex;
  justify-content: center;
  height: ${HEADER_HEIGHT};

  z-index: 1;
`

const Content = styled.div`
  width: 100%;
  max-width: ${MAX_BODY_WIDTH};
  padding: 0px ${BODY_PADDING};

  display: flex;
  align-items: center;
`

const Logo = styled.h1`
  font-family: Barlow Semi Condensed;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;

  color: ${getColor("accent")};
`

const Nav = styled.nav`
  height: ${HEADER_HEIGHT};
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export function Header() {
  const { sidebarStore } = useStores()

  return useObserver(() => (
    <Container>
      <Content>
        <Logo>Gears</Logo>
        <Nav>
          <IconButton
            icon="menu"
            active={sidebarStore.open}
            onClick={() => (sidebarStore.open = !sidebarStore.open)}
          />
        </Nav>
      </Content>
    </Container>
  ))
}
