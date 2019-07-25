import { BaseDescriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"

export interface ParameterDescriptor extends BaseDescriptor<"Parameter"> {
  name: string
  defaultValue?: any
  type: TypeDescriptor
}
