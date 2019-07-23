import { styled } from "../../../modules/theming/themes"
import React from "react"

export interface SidebarProps {
  children: React.ReactNode
}

const Container = styled.div`
  flex-shrink: 0;

  width: 284px;
  margin-right: 16px;

  padding-bottom: 64px;
`

export function Sidebar(props: SidebarProps) {
  return <Container>{props.children}</Container>
}
