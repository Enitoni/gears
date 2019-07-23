import { useDocumentation } from "../hooks/useDocumentation"
import React from "react"
import { Link } from "../../../common/navigation/components/Link"

export interface ModuleLinkProps {
  name: string
}

export function ModuleLink(props: ModuleLinkProps) {
  const documentation = useDocumentation()
  const descriptor = documentation.getModule(props.name)

  if (!descriptor) return <>Invalid module</>

  const { name } = descriptor

  return <Link to={`/docs/${documentation.version}/${name}`}>{name}</Link>
}
