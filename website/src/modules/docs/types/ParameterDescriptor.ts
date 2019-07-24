import { Descriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"

export interface ParameterDescriptor extends Descriptor<"Parameter"> {
  name: string
  defaultValue?: any
  type: TypeDescriptor
}
