import {
  Category,
  CategoryLink
} from "../../../common/navigation/components/CategoryNavigation"
import { DocumentationModel } from "../models/DocumentationModel"
import { DocumentationCategory } from "../types/DocumentationCategory"
import { ModuleDescriptor } from "../types/ModuleDescriptor"
import { kindToIconMap } from "../constants"
import { Descriptor } from "../types/Descriptor"
import { filterDescriptor } from "./filterDescriptor"

export const getDocumentationCategories = (documentation: DocumentationModel) => {
  const { categories, version } = documentation

  const mapChild = (descriptor: Descriptor, parentTo: string) => {
    const { name, kind } = descriptor

    return {
      to: `${parentTo}#${name}`,
      label: name,
      icon: kindToIconMap[kind]
    }
  }

  const sortChild = (a: Descriptor, b: Descriptor) => {
    return a.kind === b.kind ? 0 : a.kind < b.kind ? 1 : -1
  }

  const mapDescriptor = (descriptor: ModuleDescriptor): CategoryLink => {
    const { name, kind } = descriptor

    const to = `/docs/${version}/${name}`

    const children = [...(descriptor.children || [])]
      .filter(filterDescriptor)
      .sort(sortChild)
      .map(c => mapChild(c, to))

    return {
      to,
      children,
      label: name,
      icon: kindToIconMap[kind]
    }
  }

  const mapCategory = (category: DocumentationCategory): Category => {
    const descriptors = category.modules.map(mapDescriptor)

    return {
      name: category.name,
      items: descriptors
    }
  }

  return categories.map(mapCategory)
}
