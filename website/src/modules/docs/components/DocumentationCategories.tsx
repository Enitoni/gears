import { CategorySection } from "../../../common/navigation/components/CategoryNavigation"
import { DocumentationModel } from "../models/DocumentationModel"
import { kindToIconMap } from "../constants"
import { useSidebar } from "../../../common/navigation/hooks/useSidebar"

export interface DocumentationCategoriesProps {
  documentation: DocumentationModel
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

  useSidebar(mappedCategories)
  return null
}
