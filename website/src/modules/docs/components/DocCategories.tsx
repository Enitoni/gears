import React from "react"

import { Documentation } from "../types/Documentation"
import { CategoryNavigation } from "../../../common/navigation/components/CategoryNavigation"
import { ModuleDescriptor, ModuleKind } from "../types/ModuleDescriptor"

export interface DocCategoriesProps {
  documentation: Documentation
}

export function DocCategories(props: DocCategoriesProps) {
  const { documentation } = props

  const categories: Record<string, ModuleDescriptor<ModuleKind>[]> = {}

  for (const descriptor of documentation.modules) {
    const descriptors = (categories[descriptor.category] =
      categories[descriptor.category] || [])

    descriptors.push(descriptor)
  }

  const mappedCategories = Object.entries(categories).map(([key, descriptors]) => {
    const mappedDescriptors = descriptors.map(descriptor => ({
      label: descriptor.name,
      to: `/docs/${descriptor.name}`
    }))

    return {
      name: key,
      items: mappedDescriptors
    }
  })

  return <CategoryNavigation categories={mappedCategories} />
}
