import fs from "fs"
import { promisify } from "util"

interface Tag {
  tag: string
  text: string
}

interface Comment {
  shortText?: string
  tags?: Tag[]
}

/**
 * This file flattens and normalizes the output from TypeDoc to be easier to work with
 */

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)

const args = process.argv.slice(2)
const path = String(args[0])

/** Get a single tag by type */
function getTag(comment: Comment, type: string) {
  const tag = getTags(comment, type)[0]
  return tag
}

/** Get a list of tags by type, comment.tags */
function getTags(comment: Comment, type: string): string[] {
  if (!comment) return []
  if (!comment.tags) return []

  return comment.tags.filter(x => x.tag === type).map(x => x.text.trim())
}

function flattenGenerics(generics: any[], comment: Comment) {
  const flattened = flattenChildren(generics)
  if (!flattened) return

  const genericComments = Object.fromEntries(
    getTags(comment, "template").map((x: string) => x.split(/ (.*)/))
  )

  return flattened.map((generic: any) => ({
    ...generic,
    description: genericComments[generic.name]
  }))
}

const flattenAccessor = (accessor: any) => {
  const { getSignature, ...rest } = flattenChild(accessor)
  const type = flattenChild(getSignature[0].type)

  return { ...rest, type, kind: "Property" }
}

function flattenChild(child: any): any {
  const {
    kind: _,
    groups: ___,
    kindString: kind,
    typeParameter,
    comment,
    flags,
    sources,
    ...rest
  } = child

  const category = getTag(comment, "category")
  const example = getTag(comment, "example")
  const warning = getTag(comment, "warning")

  const description = comment && comment.shortText

  const signatures = flattenChildren(rest.signatures)
  const parameters = flattenChildren(rest.parameters)
  const children = flattenChildren(rest.children)
  const generics = flattenGenerics(typeParameter, comment)
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
    declaration,
    warning,
    example,
    ...flags
  }
}

const filterChildren = (child: any) => {
  const allowedUndescores = ["__get", "__call"]

  const isAllowed =
    child.name && child.name.startsWith("_")
      ? allowedUndescores.includes(child.name)
      : true

  return !child.isPrivate && isAllowed
}

const flattenChildren = <T>(arr?: T[]): T[] | undefined => {
  const flattenMap: Record<string, any> = {
    Accessor: flattenAccessor
  }

  return (
    arr &&
    arr
      .map((x: any) => {
        const fn = flattenMap[x.kindString]

        return fn ? fn(x) : flattenChild(x)
      })
      .filter(filterChildren)
  )
}

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

  await write(newPath, JSON.stringify({ version, modules: flattened }))
  await unlink(path)
}

main()
