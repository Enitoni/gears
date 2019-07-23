import React from "react"

import { CategoryNavigation } from "../../../common/navigation/components/CategoryNavigation"
import { DocumentationModel } from "../models/DocumentationModel"

export interface DocumentationCategoriesProps {
  documentation: DocumentationModel
}

export function DocumentationCategories(props: DocumentationCategoriesProps) {
  const { documentation } = props
  const { categories } = documentation

  const mappedCategories = categories.map(descriptors => {
    const mappedDescriptors = descriptors.modules.map(category => ({
      label: category.name,
      to: `/docs/${documentation.data.version}/${category.name}`
    }))

    return {
      name: descriptors.name,
      items: mappedDescriptors
    }
  })

  return <CategoryNavigation categories={mappedCategories} />
}
