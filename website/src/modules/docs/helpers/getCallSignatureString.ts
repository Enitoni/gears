import { CallSignatureDescriptor } from "../types/CallSignatureDescriptor"

export const getCallSignatureString = (descriptor: CallSignatureDescriptor) => {
  const parameterString = (descriptor.parameters || [])
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
