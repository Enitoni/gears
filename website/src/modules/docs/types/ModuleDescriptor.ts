import { BaseDescriptor, DescriptorKind, Descriptor } from "./Descriptor"
import { ClassDescriptor } from "./ClassDescriptor"
import { InterfaceDescriptor } from "./InterfaceDescriptor"
import { FunctionDescriptor } from "./FunctionDescriptor"
import { GenericDescriptor } from "./GenericDescriptor"

export type ModuleKind = Extract<
  DescriptorKind,
  "Class" | "Function" | "Interface" | "Type alias"
>

export interface BaseModuleDescriptor<T extends ModuleKind> extends BaseDescriptor<T> {
  category: string
  description: string
  children: Descriptor[]
  generics?: GenericDescriptor[]
}

export type ModuleDescriptor =
  | BaseModuleDescriptor<Exclude<ModuleKind, "Class" | "Interface" | "Function">>
  | ClassDescriptor
  | InterfaceDescriptor
  | FunctionDescriptor
