import { BaseDescriptor } from "./Descriptor"
import { TypeDescriptor } from "./TypeDescriptor"

export interface GenericDescriptor extends BaseDescriptor<"Type parameter"> {
  type: TypeDescriptor
}
