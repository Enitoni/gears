import { BaseDescriptor } from "./Descriptor"
import { PropertyDescriptor } from "./PropertyDescriptor"

export interface InterfaceDescriptor extends BaseDescriptor<"Interface"> {
  children: PropertyDescriptor[]
}
