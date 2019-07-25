import { ConstructorSignature } from "../types/ClassDescriptor"

export const getConstructorSignatureString = (descriptor: ConstructorSignature) => {
  const parameterString = descriptor.parameters
    .map(descriptor => {
      const { name, defaultValue } = descriptor
      let str = name

      if (defaultValue) {
        str += ` = ${defaultValue}`
      }

      return str
    })
    .join(", ")

  return `${descriptor.name}(${parameterString})`
}
