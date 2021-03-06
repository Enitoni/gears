import React from "react"
import { styled } from "../../theming/themes"
import { getColor, getTransparency } from "../../theming/helpers"
import { MAX_BODY_WIDTH, BODY_PADDING, HEADER_HEIGHT } from "../constants"
import { IconButton } from "../../../common/button/components/IconButton"
import { useStores } from "../../../common/state/hooks/useStores"
import { useObserver } from "mobx-react-lite"
import { Icon } from "../../../common/icon/components/Icon"
import { size } from "polished"
import { SIDEBAR_BREAKPOINT } from "../../../common/navigation/constants"

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

const Logo = styled.div`
  ${size(24)}

  > .icon {
    ${size(24)}
    fill: ${getColor("accent")}
  }
`

const Nav = styled.nav`
  height: ${HEADER_HEIGHT};
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MobileOnly = styled.div`
  display: none;

  @media ${SIDEBAR_BREAKPOINT} {
    display: block;
  }
`

export function Header() {
  const { sidebarStore } = useStores()

  return useObserver(() => (
    <Container>
      <Content>
        <Logo>
          <Icon className="icon" name="logo" />
        </Logo>
        <Nav>
          <MobileOnly>
            <IconButton
              icon="menu"
              name="Menu button"
              active={sidebarStore.open}
              onClick={() => (sidebarStore.open = !sidebarStore.open)}
            />
          </MobileOnly>
        </Nav>
      </Content>
    </Container>
  ))
}
