import Koa from "koa"
import Router from "koa-router"

import React from "react"
import ReactDOMServer from "react-dom/server"

import serve from "koa-static"
import { BUILD_PUBLIC_FOLDER } from "./modules/core/constants"
import { readFileSync } from "fs"
import { Head } from "./modules/core/components/Head"
import { App } from "./modules/core/components/App"
import { manager } from "./common/state/manager"

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
  const { routingStore, ssrStore } = manager.stores

  routingStore.location = {
    state: undefined,
    pathname: context.path,
    search: context.search,
    hash: ""
  }

  // Wait for async
  ReactDOMServer.renderToString(<App />)
  await Promise.all(ssrStore.promises)

  const renderedBody = ReactDOMServer.renderToString(<App />)
  const renderedHead = ReactDOMServer.renderToString(<Head />)

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
  manager.init()
  console.log(`Listening on ${port}`)
})
