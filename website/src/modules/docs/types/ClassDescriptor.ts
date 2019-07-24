import { BaseModuleDescriptor } from "./ModuleDescriptor"
import { Descriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"
import { ParameterDescriptor } from "./ParameterDescriptor"
import { Inheriting } from "./Inheriting"

export interface ConstructorSignature extends Descriptor<"Constructor signature"> {
  type: TypeDescriptor
  parameters: ParameterDescriptor[]
}

export interface MethodDescriptor extends Descriptor<"Method"> {
  inheritedFrom?: unknown
  isPublic: boolean
}

export interface ClassDescriptor extends BaseModuleDescriptor<"Class">, Inheriting {
  children: (ConstructorSignature | PropertyDescriptor | MethodDescriptor)[]
}
