import { styled } from "../../../modules/theming/themes"
import React from "react"

export interface SidebarProps {
  children: React.ReactNode
}

const Container = styled.div`
  width: 284px;
  margin-right: 32px;
`

export function Sidebar(props: SidebarProps) {
  return <Container>{props.children}</Container>
}
