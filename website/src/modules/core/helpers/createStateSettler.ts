import React from "react"
import { StoreManager } from "../../../common/state/classes/StoreManager"
import { Stores } from "../../../common/state/manager"
import { renderToString } from "react-dom/server"

export const createStateSettler = (manager: StoreManager<Stores>) => {
  let timesToRender = 1
  let renderCount = 0

  console.log("--------------")

  const render = async (element: React.ReactElement) => {
    const { ssrStore } = manager.stores

    ssrStore.lazy = true

    console.time("Render time")
    renderToString(element)
    console.timeEnd("Render time")

    if (ssrStore.promises.length > 0) {
      timesToRender++
    }

    await ssrStore.waitFor()
    renderCount++

    if (renderCount < timesToRender) {
      await render(element)
    }

    ssrStore.lazy = false
  }

  return render
}
