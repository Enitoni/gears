export interface BaseTypeDescriptor<T extends string> {
  type: T
  name: string
}

export type IntrinsicTypeDescriptor = BaseTypeDescriptor<"intrinsic">

export interface ReferenceTypeDescriptor extends BaseTypeDescriptor<"reference"> {
  id: number
  typeArguments?: TypeDescriptor[]
}

export interface ArrayTypeDescriptor extends BaseTypeDescriptor<"array"> {
  elementType: TypeDescriptor
}

export interface UnionTypeDescriptor extends BaseTypeDescriptor<"union"> {
  types: TypeDescriptor[]
}

export interface TupleTypeDescriptor extends BaseTypeDescriptor<"tuple"> {
  elements: TypeDescriptor[]
}

export interface TypeParameterDescriptor extends BaseTypeDescriptor<"typeParameter"> {}

export interface IntersectionTypeDescriptor extends BaseTypeDescriptor<"intersection"> {
  types: TypeDescriptor[]
}

export type TypeDescriptor =
  | IntrinsicTypeDescriptor
  | ReferenceTypeDescriptor
  | ArrayTypeDescriptor
  | UnionTypeDescriptor
  | TupleTypeDescriptor
  | TypeParameterDescriptor
  | IntersectionTypeDescriptor
