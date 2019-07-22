import ReactDOM from "react-dom"
import React from "react"

import { App } from "./modules/core/App"
import { DEVELOPMENT } from "./modules/core/constants"
import { manager } from "./common/state/manager"

async function main() {
  await manager.init()

  const element = document.querySelector(".app")

  if (DEVELOPMENT) {
    ReactDOM.render(<App />, element)
  } else {
    ReactDOM.hydrate(<App />, element)
  }
}

main()
