import { ModuleDescriptor, ModuleKind } from "./ModuleDescriptor"

export interface Documentation {
  version: string
  modules: ModuleDescriptor[]
}
