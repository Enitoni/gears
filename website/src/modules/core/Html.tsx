import React from "react"
import { Head } from "./Head"
import { Body } from "./Body"

export function Html() {
  return (
    <html>
      <head>
        <Head />
      </head>
      <body>
        <div className="app">
          <Body />
        </div>
        <script src="/index.js" />
      </body>
    </html>
  )
}
