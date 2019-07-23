import React from "react"
import { styled } from "../../theming/themes"
import { HEADER_HEIGHT } from "./Header"
import { MAX_BODY_WIDTH, BODY_PADDING } from "../constants"
import { Route, useRouter } from "../../../common/routing/hooks/useRouter"
import { DocumentationPage } from "../../docs/components/DocumentationPage"
import { Version } from "../../docs/stores/documentationStore"

const Container = styled.main`
  margin-top: ${parseInt(HEADER_HEIGHT) + 32}px;

  width: 100%;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  position: relative;

  max-width: ${MAX_BODY_WIDTH};
  padding: 0px ${BODY_PADDING};

  flex: 1;
`

const routes: Route[] = [
  {
    pattern: "/",
    render: () => <>Home</>
  },
  {
    pattern: "/docs/:version(/*)",
    render: (params: { version: Version }) => (
      <DocumentationPage version={params.version} />
    )
  }
]

export function Body() {
  const renderRoute = useRouter(routes)

  return (
    <Container>
      <Content>{renderRoute()}</Content>
    </Container>
  )
}
