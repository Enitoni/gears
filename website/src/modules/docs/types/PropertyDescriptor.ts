import { BaseDescriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"

export interface PropertyDescriptor extends BaseDescriptor<"Property"> {
  type: TypeDescriptor
  isPrivate: boolean
}
