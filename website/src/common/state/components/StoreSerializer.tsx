import { IS_SERVER } from "../../../modules/core/constants"
import { useManager } from "../hooks/useManager"
import React from "react"

export function StoreSerializer() {
  if (IS_SERVER) {
    const manager = useManager()
    const data = manager.serialize()

    return (
      <script data-store-hydration type="application/json">
        {JSON.stringify(data)}
      </script>
    )
  }

  return null
}
