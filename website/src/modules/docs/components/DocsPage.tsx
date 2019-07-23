import React from "react"
import { useMeta } from "../../core/hooks/useMeta"
import { styled } from "../../theming/themes"
import { Sidebar } from "../../../common/navigation/components/Sidebar"
import { useObserver } from "mobx-react-lite"
import { Documentation } from "../types/Documentation"
import { DocCategories } from "./DocCategories"
import { useIsomorphicEffect } from "../../../common/react/useIsomorphicEffect"
import { useStores } from "../../../common/state/hooks/useStores"

const Container = styled.div`
  display: flex;
`

export interface DocsRendererProps {
  documentation: Documentation
}

function DocsRenderer(props: DocsRendererProps) {
  const { documentation } = props

  useMeta({
    title: `Documentation for ${documentation.version}`
  })

  return (
    <Container>
      <Sidebar>
        <DocCategories documentation={documentation} />
      </Sidebar>
      Some documentation goes here I guess
    </Container>
  )
}

export function DocsPage() {
  const { documentationStore, ssrStore } = useStores()

  return useObserver(() => {
    const { selected, selectedVersion } = documentationStore

    useIsomorphicEffect(() => {
      ssrStore.register(documentationStore.select(selectedVersion))
    }, [selected])

    if (selected) {
      return <DocsRenderer documentation={selected} />
    }

    return <>Fetching</>
  })
}
