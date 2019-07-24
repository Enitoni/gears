import { TypeArgumentDescriptor } from "./TypeArgumentDescriptor"

export interface BaseTypeDescriptor<T extends string> {
  type: T
  name: string
}

export type IntrinsicTypeDescriptor = BaseTypeDescriptor<"intrinsic">

export interface ReferenceTypeDescriptor extends BaseTypeDescriptor<"reference"> {
  id: number
  typeArguments?: TypeArgumentDescriptor[]
}

export interface ArrayTypeDescriptor extends BaseTypeDescriptor<"array"> {
  elementType: TypeDescriptor
}

export interface UnionTypeDescriptor extends BaseTypeDescriptor<"union"> {
  types: TypeDescriptor
}

export type TypeDescriptor =
  | IntrinsicTypeDescriptor
  | ReferenceTypeDescriptor
  | ArrayTypeDescriptor
  | UnionTypeDescriptor
