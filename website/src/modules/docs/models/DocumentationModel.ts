import { Documentation } from "../types/Documentation"
import { ModuleDescriptor } from "../types/ModuleDescriptor"
import { DocumentationCategory } from "../types/DocumentationCategory"
import { categorize } from "../../../common/lang/array/categorize"

export class DocumentationModel {
  constructor(public data: Documentation) {}

  public get categories() {
    const { modules } = this
    const categorized = categorize(modules, m => m.category)

    const result: DocumentationCategory[] = Object.entries(categorized).map(
      ([category, descriptors]) => ({
        name: category,
        modules: descriptors.sort((a, b) => {
          if (a.kind === b.kind) return 0
          return a.kind > b.kind ? 1 : -1
        })
      })
    )

    return result.filter(c => c.name !== "Internal")
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
