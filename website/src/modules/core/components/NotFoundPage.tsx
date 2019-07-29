import { useStores } from "../../../common/state/hooks/useStores"
import { HttpStatus } from "../../../common/routing/stores/routingStore"
import { styled } from "../../theming/themes"
import React from "react"
import { getColor } from "../../theming/helpers"

const Container = styled.div``

const Title = styled.h2`
  font-size: 5em;
  font-weight: 600;

  color: ${getColor("accent")};
`

const Description = styled.p`
  font-weight: 600;
`

export function NotFoundPage() {
  const { routingStore } = useStores()

  routingStore.status = HttpStatus.NotFound

  return (
    <Container>
      <Title>404</Title>
      <Description>The page you are looking for does not exist.</Description>
    </Container>
  )
}
