import { BaseModuleDescriptor } from "./ModuleDescriptor"
import { BaseDescriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"
import { ParameterDescriptor } from "./ParameterDescriptor"
import { PropertyDescriptor } from "./PropertyDescriptor"
import { Inheriting } from "./Inheriting"

export interface ConstructorSignature extends BaseDescriptor<"Constructor signature"> {
  type: TypeDescriptor
  parameters: ParameterDescriptor[]
}

export interface ConstructorDescriptor extends BaseDescriptor<"Constructor"> {
  signaures: ConstructorSignature[]
}

export interface MethodDescriptor extends BaseDescriptor<"Method"> {
  inheritedFrom?: unknown
  isPublic: boolean
}

export interface ClassDescriptor extends BaseModuleDescriptor<"Class">, Inheriting {
  children: (ConstructorDescriptor | PropertyDescriptor | MethodDescriptor)[]
}
