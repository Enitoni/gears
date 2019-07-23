import { useContext } from "react"
import { DocumentationContext } from "../components/DocumentationContext"

export const useDocumentation = () => {
  const documentation = useContext(DocumentationContext)

  if (!documentation) throw new Error("Can't use useDocumentation outside of context")

  return documentation
}
