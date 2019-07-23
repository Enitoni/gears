import React from "react"
import { useMeta } from "../../core/hooks/useMeta"
import { styled } from "../../theming/themes"
import { Sidebar } from "../../../common/navigation/components/Sidebar"
import { useObserver } from "mobx-react-lite"
import { DocumentationCategories } from "./DocumentationCategories"
import { useStores } from "../../../common/state/hooks/useStores"
import { Version } from "../stores/documentationStore"
import { useAsyncValue } from "../../../common/react/useAsyncValue"
import { DocumentationModel } from "../models/DocumentationModel"

const Container = styled.div`
  display: flex;
`

export interface DocumentationPageContentProps {
  documentation: DocumentationModel
}

function DocumentationPageContent(props: DocumentationPageContentProps) {
  const { documentation } = props

  useMeta({
    title: `Documentation for ${documentation.data.version}`
  })

  return (
    <Container>
      <Sidebar>
        <DocumentationCategories documentation={documentation} />
      </Sidebar>
      Some documentation goes here I guess
    </Container>
  )
}

export interface DocumentationPageProps {
  version: Version
}

export function DocumentationPage(props: DocumentationPageProps) {
  const { documentationStore } = useStores()
  const { version } = props

  return useObserver(() => {
    const documentation = useAsyncValue(() => documentationStore.getVersion(version))

    if (documentation.value) {
      return <DocumentationPageContent documentation={documentation.value} />
    }

    return <>Fetching</>
  })
}
