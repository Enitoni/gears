import { Descriptor } from "./Descriptor"
import { ClassDescriptor } from "./ClassDescriptor"

export type ModuleKind = "Class" | "Function" | "Interface" | "Type alias"

export interface BaseModuleDescriptor<T extends ModuleKind> extends Descriptor<T> {
  category: string
  description: string
}

export type ModuleDescriptor =
  | BaseModuleDescriptor<Exclude<ModuleKind, "Class">>
  | ClassDescriptor
