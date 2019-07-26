import { styled } from "../../../modules/theming/themes"
import React from "react"

export interface SubsectionProps {
  title: string
  children?: React.ReactNode
}

const Container = styled.h4`
  font-family: Barlow;
  font-weight: 600;
  font-size: 18px;

  margin-top: 24px;
  margin-bottom: 16px;
`

export function Subsection(props: SubsectionProps) {
  return (
    <>
      <Container>{props.title}</Container>
      {props.children}
    </>
  )
}
