import { IS_SERVER } from "../../../modules/core/constants"
import { useManager } from "../hooks/useManager"
import React from "react"

export function StoreSerializer() {
  if (IS_SERVER) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const manager = useManager()
    const data = manager.serialize()

    return <meta property="store-hydration" content={JSON.stringify(data)} />
  }

  return null
}
