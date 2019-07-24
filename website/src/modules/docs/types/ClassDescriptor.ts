import { ModuleDescriptor } from "./ModuleDescriptor"
import { Descriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"
import { ParameterDescriptor } from "./ParameterDescriptor"

export interface ConstructorSignature extends Descriptor<"Constructor signature"> {
  type: TypeDescriptor
  parameters: ParameterDescriptor[]
}

export interface ClassDescriptor extends ModuleDescriptor<"Class"> {
  signatures: ConstructorSignature[]
}
