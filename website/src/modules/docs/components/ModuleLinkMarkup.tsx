import React from "react"
import { ModuleLink } from "./ModuleLink"

export interface ModuleLinkMarkupProps {
  children: string
}

export function ModuleLinkMarkup(props: ModuleLinkMarkupProps) {
  const { children } = props

  if (!children) return null

  const parts = children.split(/\[\[\w+]]/g)
  const matches = children.match(/\[\[\w+]]/g)

  if (!matches) return <>{children}</>

  let finalDescription = []

  for (const [i, part] of parts.entries()) {
    finalDescription.push(part)

    if (i === matches.length) break

    const match = matches[i]
    const [, moduleName] = /\[\[(\w+)]]/.exec(match)!

    finalDescription.push(<ModuleLink key={`${moduleName}-${i}`} name={moduleName} />)
  }

  return <>{finalDescription}</>
}
