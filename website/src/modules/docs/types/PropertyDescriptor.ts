import { Descriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"

export interface PropertyDescriptor extends Descriptor<"Property"> {
  type: TypeDescriptor
  isPrivate: boolean
}
