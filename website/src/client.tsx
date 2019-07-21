import ReactDOM from "react-dom"
import React from "react"

import { Body } from "./modules/core/Body"
import { Head } from "./modules/core/Head"

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"

async function main() {
  if (dev) {
    ReactDOM.render(<Head />, document.head)
    ReactDOM.render(<Body />, document.querySelector(".app"))
  } else {
    ReactDOM.hydrate(<Head />, document.head)
    ReactDOM.hydrate(<Body />, document.querySelector(".app"))
  }
}

main()
