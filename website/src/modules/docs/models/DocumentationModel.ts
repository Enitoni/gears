import { Documentation } from "../types/Documentation"
import { ModuleDescriptor } from "../types/ModuleDescriptor"
import { DocumentationCategory } from "../types/DocumentationCategory"

export class DocumentationModel {
  constructor(public data: Documentation) {}

  public get categories() {
    const categoryMap: Record<string, ModuleDescriptor[]> = {}

    for (const descriptor of this.data.modules) {
      if (!categoryMap[descriptor.category]) categoryMap[descriptor.category] = []

      const descriptors = categoryMap[descriptor.category]
      descriptors.push(descriptor)
    }

    const result: DocumentationCategory[] = Object.entries(categoryMap).map(
      ([category, descriptors]) => ({
        name: category,
        modules: descriptors.sort((a, b) => {
          if (a.kind === b.kind) return 0
          return a.kind > b.kind ? 1 : -1
        })
      })
    )

    const i = result.findIndex(category => category.name === "Internal")
    const [internal] = result.splice(i, 1)
    result.push(internal)

    return result
  }

  public getModule(name: string) {
    return this.modules.find(x => x.name === name)
  }

  public get version() {
    return this.data.version
  }

  public get modules() {
    return this.data.modules
  }
}
