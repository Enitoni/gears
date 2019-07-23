import { Documentation } from "../types/Documentation"
import { ModuleDescriptor, ModuleKind } from "../types/ModuleDescriptor"
import { DocumentationCategory } from "../types/DocumentationCategory"

export class DocumentationModel {
  constructor(public data: Documentation) {}

  public get categories() {
    const categoryMap: Record<string, ModuleDescriptor<ModuleKind>[]> = {}

    for (const descriptor of this.data.modules) {
      if (!categoryMap[descriptor.category]) categoryMap[descriptor.category] = []

      const descriptors = categoryMap[descriptor.category]
      descriptors.push(descriptor)
    }

    const result: DocumentationCategory[] = Object.entries(categoryMap).map(
      ([category, descriptors]) => ({
        name: category,
        modules: descriptors
      })
    )

    const i = result.findIndex(category => category.name === "Internal")
    const [internal] = result.splice(i, 1)
    result.push(internal)

    return result
  }
}
