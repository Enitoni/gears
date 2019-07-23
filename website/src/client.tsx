import ReactDOM from "react-dom"
import React from "react"

import { App } from "./modules/core/components/App"
import { DEVELOPMENT } from "./modules/core/constants"
import { manager } from "./common/state/manager"
import { hydrateStores } from "./common/state/helpers/hydrateStores"

async function main() {
  await manager.init()
  hydrateStores()

  const element = document.querySelector(".app")

  if (DEVELOPMENT) {
    ReactDOM.render(<App />, element)
  } else {
    ReactDOM.hydrate(<App />, element)
  }
}

main()
