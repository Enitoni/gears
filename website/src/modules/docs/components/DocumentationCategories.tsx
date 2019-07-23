import React from "react"

import {
  CategoryNavigation,
  CategorySection
} from "../../../common/navigation/components/CategoryNavigation"
import { DocumentationModel } from "../models/DocumentationModel"
import { ModuleKind } from "../types/ModuleDescriptor"
import { IconType } from "../../../common/icon/types/IconType"

export interface DocumentationCategoriesProps {
  documentation: DocumentationModel
}

const kindToIconMap: Record<ModuleKind, IconType> = {
  Class: "encapsulated",
  Function: "doubleParens",
  Interface: "placeholder"
}

export function DocumentationCategories(props: DocumentationCategoriesProps) {
  const { documentation } = props
  const { categories } = documentation

  const mappedCategories = categories.map(descriptors => {
    const mappedDescriptors = descriptors.modules.map(
      (moduleDescriptor): CategorySection => ({
        label: moduleDescriptor.name,
        icon: kindToIconMap[moduleDescriptor.kind],
        to: `/docs/${documentation.data.version}/${moduleDescriptor.name}`
      })
    )

    return {
      name: descriptors.name,
      items: mappedDescriptors
    }
  })

  return <CategoryNavigation categories={mappedCategories} />
}
