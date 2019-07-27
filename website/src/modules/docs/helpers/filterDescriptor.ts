import { Descriptor } from "../types/Descriptor"
import { filterMethod } from "./filterMethod"
import { MethodDescriptor } from "../types/ClassDescriptor"

export const filterDescriptor = (descriptor: Descriptor) => {
  const { category, kind } = descriptor

  if (category === "Internal") return false
  if (kind === "Method") return filterMethod(descriptor as MethodDescriptor)

  return !["Constructor"].includes(descriptor.kind)
}
