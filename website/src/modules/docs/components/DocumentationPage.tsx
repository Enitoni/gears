import React from "react"
import { useMeta } from "../../core/hooks/useMeta"
import { useObserver } from "mobx-react-lite"
import { useStores } from "../../../common/state/hooks/useStores"
import { Version, DocumentationStoreStatus } from "../stores/documentationStore"
import { DocumentationModel } from "../models/DocumentationModel"
import { useIsomorphicEffect } from "../../../common/react/useIsomorphicEffect"
import { HttpStatus } from "../../../common/routing/stores/routingStore"
import { Route, useRouter } from "../../../common/routing/hooks/useRouter"
import { ModuleDescriptorRenderer } from "./ModuleDescriptorRenderer/ModuleDescriptorRenderer"
import { DocumentationContext } from "./DocumentationContext"
import { useSidebar } from "../../../common/navigation/hooks/useSidebar"
import { getDocumentationCategories } from "../helpers/getDocumentationCategories"

export interface DocumentationPageContentProps {
  documentation: DocumentationModel
}

function DocumentationPageContent(props: DocumentationPageContentProps) {
  const { documentation } = props

  useMeta({
    title: `Documentation for ${documentation.data.version}`
  })

  const routes: Route[] = documentation.modules.map(descriptor => ({
    pattern: `/docs/${documentation.version}/${descriptor.name}`,
    render: () => <ModuleDescriptorRenderer descriptor={descriptor} />
  }))

  const renderRoutes = useRouter(routes)

  useSidebar(getDocumentationCategories(documentation))

  return (
    <DocumentationContext.Provider value={documentation}>
      {renderRoutes()}
    </DocumentationContext.Provider>
  )
}

export interface DocumentationPageProps {
  version: Version
}

export function DocumentationPage(props: DocumentationPageProps) {
  const { documentationStore, ssrStore, routingStore } = useStores()
  const { status, selected } = useObserver(() => ({
    status: documentationStore.status,
    selected: documentationStore.selected
  }))

  const { version } = props

  useIsomorphicEffect(() => {
    if (!selected || selected.version !== version) {
      ssrStore.register(documentationStore.getVersion(version))
    }

    if (status === DocumentationStoreStatus.NotFound) {
      routingStore.status = HttpStatus.NotFound
    }
  }, [version])

  if (selected) {
    return <DocumentationPageContent documentation={selected} />
  }

  if (status === DocumentationStoreStatus.NotFound) {
    return <>Not found</>
  }

  return <>Fetching</>
}
