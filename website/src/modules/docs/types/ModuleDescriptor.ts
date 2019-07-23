import { Descriptor } from "./Descriptor"

export type ModuleKind = "Class" | "Function" | "Interface" | "Type alias"

export interface ModuleDescriptor<T extends ModuleKind> extends Descriptor<T> {
  name: string
  category: string
  description: string
}
