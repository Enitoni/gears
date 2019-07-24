import { TypeDescriptor } from "./TypeDescriptor"

export interface Inheriting {
  extendedTypes?: TypeDescriptor[]
  implementedTypes?: TypeDescriptor[]
}
