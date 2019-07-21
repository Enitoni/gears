import Koa from "koa"
import Router from "koa-router"

import React from "react"
import ReactDOMServer from "react-dom/server"

import serve from "koa-static"
import { Html } from "./modules/core/Html"

const app = new Koa()
const router = new Router()

router.use(serve("./build/public"))

router.get("*", async context => {
  const string = `<!DOCTYPE html>${ReactDOMServer.renderToString(<Html />)}`
  context.body = string
})

app.use(router.middleware())

const port = 9020
const server = app.listen(port)

server.on("listening", () => {
  console.log(`Listening on ${port}`)
})
