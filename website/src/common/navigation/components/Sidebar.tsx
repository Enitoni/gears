import { styled } from "../../../modules/theming/themes"
import React from "react"
import { HEADER_HEIGHT } from "../../../modules/core/components/Header"

export interface SidebarProps {
  children: React.ReactNode
}

const Container = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT};
  bottom: 0px;

  flex-shrink: 0;
  width: 284px;
  padding-top: 32px;

  overflow-y: scroll;
`

const Space = styled.div`
  width: 284px;
  margin-right: 32px;
`

const BottomSpace = styled.div`
  height: 32px;
`

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <Container>
        {props.children}
        <BottomSpace />
      </Container>
      <Space />
    </>
  )
}
