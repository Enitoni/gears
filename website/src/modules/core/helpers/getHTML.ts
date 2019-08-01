import { readFileSync } from "fs"
import { BUILD_PUBLIC_FOLDER } from "../constants"

const baseHtml = readFileSync(`${BUILD_PUBLIC_FOLDER}/index.html`, "utf8")

export const getHTML = (removeScripts: boolean) => {
  let html = baseHtml

  if (removeScripts) {
    html = html.replace(/<script src="[^"]*"><\/script>/g, "")
  }

  const [start, bundles, app] = html
    .replace(/<head>|<div class="app">/g, "$&{split}")
    .split("{split}")

  return { html, start, bundles, app }
}
