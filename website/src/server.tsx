import Koa from "koa"
import Router from "koa-router"

import React from "react"
import ReactDOMServer from "react-dom/server"

import serve from "koa-static"
import { BUILD_PUBLIC_FOLDER } from "./modules/core/constants"
import { readFileSync } from "fs"
import { Head } from "./modules/core/components/Head"
import { App } from "./modules/core/components/App"
import { createManager } from "./common/state/manager"
import { ManagerContext } from "./common/state/components/ManagerContext"

const app = new Koa()
const router = new Router()

const HTML = readFileSync(`${BUILD_PUBLIC_FOLDER}/index.html`, "utf8")
const HEAD_STRING = "<head>"
const CONTAINER_STRING = `<div class="app">`

router.use(
  serve(BUILD_PUBLIC_FOLDER, {
    index: false
  })
)

router.get("*", async context => {
  const manager = createManager()
  const { routingStore, ssrStore } = manager.stores

  await manager.init()

  routingStore.location = {
    state: undefined,
    pathname: context.path,
    search: context.search,
    hash: ""
  }

  const wrapInContext = (element: React.ReactNode) => {
    return <ManagerContext.Provider value={manager}>{element}</ManagerContext.Provider>
  }

  // Wait for async
  ReactDOMServer.renderToString(wrapInContext(<App />))
  await Promise.all(ssrStore.promises)

  const renderedBody = ReactDOMServer.renderToString(wrapInContext(<App />))
  const renderedHead = ReactDOMServer.renderToString(wrapInContext(<Head />))

  let finalHTML = HTML

  finalHTML = finalHTML.replace(HEAD_STRING, `${HEAD_STRING}${renderedHead}`)
  finalHTML = finalHTML.replace(CONTAINER_STRING, `${CONTAINER_STRING}${renderedBody}`)

  context.body = finalHTML
  manager.reset()
})

app.use(router.middleware())

const port = 9020
const server = app.listen(port)

server.on("listening", () => {
  console.log(`Listening on ${port}`)
})
