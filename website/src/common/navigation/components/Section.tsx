import { styled } from "../../../modules/theming/themes"
import React from "react"

export interface SectionProps {
  title: string
  children?: React.ReactNode
}

const Container = styled.section`
  margin-top: 32px;
`

const Title = styled.h3`
  font-weight: 600;
  font-size: 24px;

  margin-bottom: 16px;
`

export function Section(props: SectionProps) {
  return (
    <Container>
      <Title>{props.title}</Title>
      {props.children}
    </Container>
  )
}
