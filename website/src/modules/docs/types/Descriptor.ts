import {
  ClassDescriptor,
  MethodDescriptor,
  ConstructorDescriptor
} from "./ClassDescriptor"
import { PropertyDescriptor } from "./PropertyDescriptor"
import { Description } from "../components/ModuleDescriptorRenderer/Description"

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
  | "Call signature"
  | "Constructor signature"

export interface BaseDescriptor<T extends DescriptorKind = DescriptorKind> {
  id: number
  name: string
  description?: string
  example?: string
  warning?: string
  kind: T
}

export type Descriptor =
  | ClassDescriptor
  | PropertyDescriptor
  | MethodDescriptor
  | ConstructorDescriptor
