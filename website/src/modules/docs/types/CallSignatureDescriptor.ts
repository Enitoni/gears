import { BaseDescriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"
import { ParameterDescriptor } from "./ParameterDescriptor"

export interface CallSignatureDescriptor extends BaseDescriptor<"Call signature"> {
  type: TypeDescriptor
  parameters: ParameterDescriptor[]
}
