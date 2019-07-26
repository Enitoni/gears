import { InterfaceDescriptor } from "../types/InterfaceDescriptor"
import React from "react"
import { PropertyDescriptorList } from "./PropertyDescriptorList"

export interface InterfaceDescriptorRendererProps {
  descriptor: InterfaceDescriptor
}

export function InterfaceDescriptorRenderer(props: InterfaceDescriptorRendererProps) {
  const { descriptor } = props
  const { children } = descriptor

  if (children.length === 0) return null

  return <PropertyDescriptorList descriptors={children} />
}
