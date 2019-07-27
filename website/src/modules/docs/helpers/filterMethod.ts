import { MethodDescriptor } from "../types/ClassDescriptor"

export const filterMethod = (descriptor: MethodDescriptor) => {
  const { inheritedFrom } = descriptor
  const { category } = descriptor.signatures[0]

  return !inheritedFrom && category !== "Internal"
}
