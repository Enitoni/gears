import React, { useEffect } from "react"
import { useMeta } from "../../core/hooks/useMeta"
import { styled } from "../../theming/themes"
import { Sidebar } from "../../../common/navigation/components/Sidebar"
import { manager } from "../../../common/state/manager"
import { useAsyncValue } from "../../../common/react/useAsyncValue"
import { useObserver } from "mobx-react-lite"

const Container = styled.div`
  display: flex;
`

export function DocsPage() {
  const { docStore } = manager.stores

  return useObserver(() => {
    const { selected } = docStore
    const asyncModule = useAsyncValue(() => docStore.getModules(selected))

    useMeta({
      title: "Documentation"
    })

    if (!asyncModule.value || !asyncModule.done) {
      return <>Fetching</>
    }

    return (
      <Container>
        <Sidebar>Yeet</Sidebar>
        the skeet
      </Container>
    )
  })
}
