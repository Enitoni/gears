import { LinkProps, Container } from "./Link"
import React from "react"

export function ExternalLink(props: LinkProps) {
  const { to, children, className } = props

  return (
    <Container className={className} rel="noreferrer" href={to} target="_blank">
      {children}
    </Container>
  )
}
