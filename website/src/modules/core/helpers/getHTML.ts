import { readFileSync } from "fs"
import { BUILD_PUBLIC_FOLDER } from "../constants"

export const getHTML = () => {
  const html = readFileSync(`${BUILD_PUBLIC_FOLDER}/index.html`, "utf8")

  const [start, bundles, app] = html
    .replace(/<head>|<div class="app">/g, "$&{split}")
    .split("{split}")

  return { html, start, bundles, app }
}
