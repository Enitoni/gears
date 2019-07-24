process.env.__SERVER__ = "true"

import Koa from "koa"
import Router from "koa-router"

import React from "react"
import { renderToString, renderToNodeStream } from "react-dom/server"

import serve from "koa-static"
import { BUILD_PUBLIC_FOLDER, SERVER_SUPPORTED_ENCODINGS } from "./modules/core/constants"
import { Head } from "./modules/core/components/Head"
import { App } from "./modules/core/components/App"
import { createManager } from "./common/state/manager"
import { ManagerContext } from "./common/state/components/ManagerContext"
import { promisifyPipe } from "./modules/core/helpers/promisifyPipe"
import { getHTML } from "./modules/core/helpers/getHTML"

const app = new Koa()
const router = new Router()

const html = getHTML()

router.use(
  serve(BUILD_PUBLIC_FOLDER, {
    index: false
  })
)

router.get("*", async context => {
  context.set("Content-Type", "text/html")

  const encoding = context.acceptsEncodings(Object.keys(SERVER_SUPPORTED_ENCODINGS)) as
    | keyof typeof SERVER_SUPPORTED_ENCODINGS
    | false

  if (!encoding) return context.throw(406)
  if (encoding !== "identity") context.set("Content-Encoding", encoding)

  const stream = SERVER_SUPPORTED_ENCODINGS[encoding]()

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

  const app = wrapInContext(<App />)

  // Wait for async
  renderToString(app)
  await Promise.all(ssrStore.promises)

  stream.write(html.start)
  await promisifyPipe(renderToNodeStream(wrapInContext(<Head />)), stream)
  stream.write(html.bundles)
  await promisifyPipe(renderToNodeStream(app), stream)
  stream.write(html.app)

  stream.end()

  context.status = routingStore.status
  context.body = stream

  manager.reset()
})

app.use(router.middleware())

const port = 9020
const server = app.listen(port)

server.on("listening", () => {
  console.log(`Listening on ${port}`)
})
