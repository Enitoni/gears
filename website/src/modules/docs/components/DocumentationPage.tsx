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
import { useRedirect } from "../../../common/routing/hooks/useRedirect"
import { NotFoundPage } from "../../core/components/NotFoundPage"

export interface DocumentationPageContentProps {
  documentation: DocumentationModel
}

function DocumentationPageContent(props: DocumentationPageContentProps) {
  const { documentation } = props

  const root = `/docs/${documentation.version}`
  const firstDescriptor = documentation.modules[0]

  useSidebar(getDocumentationCategories(documentation))
  useRedirect(root, `${root}/${firstDescriptor.name}`)

  const renderRoutes = useRouter([
    ...documentation.modules.map(descriptor => ({
      pattern: `${root}/${descriptor.name}`,
      render: () => <ModuleDescriptorRenderer descriptor={descriptor} />
    })),
    {
      pattern: "*",
      render: () => <NotFoundPage />
    }
  ])

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
  const { documentationStore, ssrStore } = useStores()
  const { status, selected } = useObserver(() => ({
    status: documentationStore.status,
    selected: documentationStore.selected
  }))

  const { version } = props

  useIsomorphicEffect(() => {
    if (!selected || selected.version !== version) {
      ssrStore.register(documentationStore.getVersion(version))
    }
  }, [version])

  if (selected) {
    return <DocumentationPageContent documentation={selected} />
  }

  if (status === DocumentationStoreStatus.NotFound) {
    return <NotFoundPage />
  }

  return <>Fetching</>
}
