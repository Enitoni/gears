import React from "react"

import { CategoryNavigation } from "../../../common/navigation/components/CategoryNavigation"
import { useStores } from "../../../common/state/hooks/useStores"

export function DocCategories() {
  const { documentationStore } = useStores()

  const mappedCategories = documentationStore.categories.map(descriptors => {
    const mappedDescriptors = descriptors.modules.map(category => ({
      label: category.name,
      to: `/docs/${category.name}`
    }))

    return {
      name: descriptors.name,
      items: mappedDescriptors
    }
  })

  return <CategoryNavigation categories={mappedCategories} />
}
