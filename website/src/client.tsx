import ReactDOM from "react-dom"
import React from "react"

import { App } from "./modules/core/App"
import { Head } from "./modules/core/Head"
import { DEVELOPMENT } from "./modules/core/constants"
import { manager } from "./common/state/manager"

async function main() {
  await manager.init()

  if (DEVELOPMENT) {
    ReactDOM.render(<Head />, document.head)
    ReactDOM.render(<App />, document.querySelector(".app"))
  } else {
    ReactDOM.hydrate(<Head />, document.head)
    ReactDOM.hydrate(<App />, document.querySelector(".app"))
  }
}

main()
