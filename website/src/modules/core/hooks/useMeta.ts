import { MetaInformation } from "../stores/metaStore"
import { useIsomorphicEffect } from "../../../common/react/useIsomorphicEffect"
import { useStores } from "../../../common/state/hooks/useStores"

export const useMeta = (newMeta: Partial<MetaInformation>) => {
  const { metaStore } = useStores()

  useIsomorphicEffect(() => {
    metaStore.setValue(newMeta)

    return () => {
      metaStore.setValue({})
    }
  }, [newMeta])
}
