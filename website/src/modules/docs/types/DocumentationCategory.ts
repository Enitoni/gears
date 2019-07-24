import { ModuleDescriptor } from "./ModuleDescriptor"

export interface DocumentationCategory {
  name: string
  modules: ModuleDescriptor[]
}
