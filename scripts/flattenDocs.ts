import fs from "fs"
import { basename } from "path"
import { promisify } from "util"

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)

const args = process.argv.slice(2)
const path = String(args[0])

function getTag(comment: any, type: string) {
  if (!comment) return
  if (!comment.tags) return

  const tag = comment.tags.find((x: any) => x.tag === type) || {}
  if (!tag) return

  return tag.text.trim()
}

function flattenChild(child: any): any {
  const {
    kind: _,
    typeParameter: __,
    groups: ___,
    kindString: kind,
    comment,
    flags,
    sources,
    ...rest
  } = child

  const category = getTag(comment, "category")
  const description = comment && comment.shortText

  const signatures = flattenChildren(rest.signatures)
  const parameters = flattenChildren(rest.parameters)
  const children = flattenChildren(rest.children)
  const generics = flattenChildren(rest.typeParameter)
  const getSignature = flattenChildren(rest.getSignature)
  const types = flattenChildren(rest.types)

  const type = typeof rest.type === "object" ? flattenChild(rest.type) : rest.type
  const declaration = rest.declaration && flattenChild(rest.declaration)

  return {
    ...rest,
    kind,
    type,
    types,
    category,
    description,
    generics,
    signatures,
    parameters,
    children,
    getSignature,
    declaration,
    ...flags
  }
}

const flattenChildren = (arr?: any[]): any => arr && arr.map(x => flattenChild(x))

function flatten(docs: any) {
  const modules = docs.children
    .flatMap((x: any) => x.children)
    .filter((x: any) => x)
    .map((x: any) => flattenChild(x))
    .filter((x: any) => x.category)

  return modules
}

async function main() {
  const docString = await read(path, "utf8")
  const packageString = await read("package.json", "utf8")

  const { version } = JSON.parse(packageString)
  const docsObject = JSON.parse(docString)

  const flattened = flatten(docsObject)

  const newPath = path.replace(".json", `_${version.replace(/\./g, "-")}.json`)
  await write(newPath, JSON.stringify({ version, modules: flattened }, undefined, 2))
}

main()
