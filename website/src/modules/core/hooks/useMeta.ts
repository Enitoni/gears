import { MetaInformation } from "../stores/metaStore"
import { manager } from "../../../common/state/manager"
import { useIsomorphicEffect } from "../../../common/react/useIsomorphicEffect"

export const useMeta = (newMeta: Partial<MetaInformation>) => {
  const { metaStore } = manager.stores

  useIsomorphicEffect(() => {
    metaStore.setValue(newMeta)

    return () => {
      metaStore.setValue({})
    }
  }, [newMeta])
}
