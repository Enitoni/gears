import ReactDOM from "react-dom"
import React from "react"

import { App } from "./modules/core/App"
import { Head } from "./modules/core/Head"

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"

async function main() {
  if (dev) {
    ReactDOM.render(<Head />, document.head)
    ReactDOM.render(<App />, document.querySelector(".app"))
  } else {
    ReactDOM.hydrate(<Head />, document.head)
    ReactDOM.hydrate(<App />, document.querySelector(".app"))
  }
}

main()
