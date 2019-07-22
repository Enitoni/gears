import fs from "fs"
import { promisify } from "util"

const write = promisify(fs.writeFile)
const read = promisify(fs.readFile)
const scan = promisify(fs.readdir)
const unlink = promisify(fs.unlink)

const REPO_PATH = "./doc-repo"
const INDEX_PATH = `${REPO_PATH}/index.json`

async function main() {
  try {
    await unlink(INDEX_PATH)
  } catch {}

  const files = await scan(REPO_PATH)
  const result: string[] = []

  for (const file of files) {
    const fileString = await read(`${REPO_PATH}/${file}`, "utf8")
    const data = JSON.parse(fileString)

    result.push(data.version)
  }

  await write(INDEX_PATH, JSON.stringify(result))
}

main()
