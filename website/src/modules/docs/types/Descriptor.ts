import {
  ClassDescriptor,
  MethodDescriptor,
  ConstructorDescriptor
} from "./ClassDescriptor"
import { PropertyDescriptor } from "./PropertyDescriptor"

export type DescriptorKind =
  | "Class"
  | "Function"
  | "Interface"
  | "Method"
  | "Property"
  | "Parameter"
  | "Type alias"
  | "Constructor"
  | "Type parameter"
  | "Constructor signature"

export interface BaseDescriptor<T extends DescriptorKind = DescriptorKind> {
  id: number
  name: string
  example?: string
  warning?: string
  kind: T
}

export type Descriptor =
  | ClassDescriptor
  | PropertyDescriptor
  | MethodDescriptor
  | ConstructorDescriptor
