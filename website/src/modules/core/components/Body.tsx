import React from "react"
import { styled } from "../../theming/themes"
import { MAX_BODY_WIDTH, BODY_PADDING, HEADER_HEIGHT } from "../constants"
import { Route, useRouter } from "../../../common/routing/hooks/useRouter"
import { DocumentationPage } from "../../docs/components/DocumentationPage"
import { Version } from "../../docs/stores/documentationStore"
import { Sidebar } from "../../../common/navigation/components/Sidebar"
import { NotFoundPage } from "./NotFoundPage"
import { HomePage } from "./HomePage"
import { GuidePage } from "../../guiding/components/GuidePage"

const Container = styled.main`
  margin-top: ${parseInt(HEADER_HEIGHT) + 32}px;
  padding-bottom: 32px;

  width: 100%;
  display: flex;
  justify-content: center;
`

const Width = styled.div`
  position: relative;

  max-width: ${MAX_BODY_WIDTH};
  padding: 0px ${BODY_PADDING};

  flex: 1;
`

const Content = styled.div`
  display: flex;
  justify-content: flex-end;

  > .route {
    flex: 1;
    justify-content: initial;
  }
`

const routes: Route[] = [
  {
    pattern: "/",
    render: () => <HomePage />,
  },
  {
    pattern: "/docs/:version(/*)",
    render: (params: { version: Version }) => (
      <DocumentationPage version={params.version} />
    ),
  },
  {
    pattern: "/guides(/:slug)",
    render: (params: { slug: string }) => <GuidePage slug={params.slug} />,
  },
  {
    pattern: "*",
    render: () => <NotFoundPage />,
  },
]

export function Body() {
  const renderRoute = useRouter(routes)

  return (
    <Container>
      <Width>
        <Content>
          <div className="route">{renderRoute()}</div>
          <Sidebar />
        </Content>
      </Width>
    </Container>
  )
}
