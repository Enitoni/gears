import { MetaInformation } from "../stores/metaStore"
import { useEffect } from "react"
import { manager } from "../../../common/state/manager"

export const useMeta = (newMeta: Partial<MetaInformation>) => {
  const { metaStore } = manager.stores

  useEffect(() => {
    metaStore.setValue(newMeta)
    return () => metaStore.setValue({})
  }, [newMeta])
}
