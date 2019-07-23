import React from "react"
import { DocumentationModel } from "../models/DocumentationModel"

export const DocumentationContext = React.createContext<DocumentationModel | undefined>(
  undefined
)
