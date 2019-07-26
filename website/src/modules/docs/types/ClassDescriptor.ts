import { BaseModuleDescriptor } from "./ModuleDescriptor"
import { BaseDescriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"
import { ParameterDescriptor } from "./ParameterDescriptor"
import { PropertyDescriptor } from "./PropertyDescriptor"
import { Inheriting } from "./Inheriting"
import { CallSignatureDescriptor } from "./CallSignatureDescriptor"

export interface ConstructorSignature extends BaseDescriptor<"Constructor signature"> {
  type: TypeDescriptor
  parameters: ParameterDescriptor[]
}

export interface ConstructorDescriptor extends BaseDescriptor<"Constructor"> {
  signatures: ConstructorSignature[]
}

export interface MethodDescriptor extends BaseDescriptor<"Method"> {
  signatures: CallSignatureDescriptor[]
  inheritedFrom?: unknown
  isPublic: boolean
}

export interface ClassDescriptor extends BaseModuleDescriptor<"Class">, Inheriting {
  children: (ConstructorDescriptor | PropertyDescriptor | MethodDescriptor)[]
}
