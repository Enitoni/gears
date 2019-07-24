import { TypeDescriptor, UnionTypeDescriptor } from "./TypeDescriptor"

export interface BaseTypeArgumentDescriptor<T extends string> {
  type: T
  name: string
}

export interface ReferenceTypeArgumentDescriptor
  extends BaseTypeArgumentDescriptor<"reference"> {
  typeArguments?: TypeArgumentDescriptor[]
}

export type TypeArgumentDescriptor =
  | BaseTypeArgumentDescriptor<"intrinsic" | "typeParameter" | "unknown">
  | ReferenceTypeArgumentDescriptor
  | UnionTypeDescriptor
