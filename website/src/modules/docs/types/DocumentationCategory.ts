import { ModuleDescriptor, ModuleKind } from "./ModuleDescriptor"

export interface DocumentationCategory {
  name: string
  modules: ModuleDescriptor<ModuleKind>[]
}
