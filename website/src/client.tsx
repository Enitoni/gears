import ReactDOM from "react-dom"
import React from "react"

import { App } from "./modules/core/components/App"
import { createManager } from "./common/state/manager"
import { hydrateStores } from "./common/state/helpers/hydrateStores"
import { ManagerContext } from "./common/state/components/ManagerContext"

async function main() {
  const manager = createManager()

  await manager.init()
  hydrateStores(manager)

  const wrapInContext = (element: React.ReactNode) => {
    return <ManagerContext.Provider value={manager}>{element}</ManagerContext.Provider>
  }

  const element = document.querySelector(".app")!

  if (element.hasChildNodes()) {
    ReactDOM.hydrate(wrapInContext(<App />), element)
  } else {
    ReactDOM.render(wrapInContext(<App />), element)
  }
}

main()
