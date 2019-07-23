import versions from "../../../../../doc-repo/index.json"

import { IS_SERVER } from "../../core/constants"
import { observable, computed } from "mobx"

import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { Documentation } from "../types/Documentation"
import { ModuleDescriptor, ModuleKind } from "../types/ModuleDescriptor"
import { DocumentationCategory } from "../types/DocumentationCategory"
import { ensureValue } from "../../../common/lang/assertion/ensureValue"

export type Version = keyof typeof versions

export interface SerializedDocumentationStore {
  selected?: Documentation
  selectedVersion: Version
}

class DocumentationStore implements InitializableStore<SerializedDocumentationStore> {
  public versionMap = versions
  public versions = Object.keys(versions) as Version[]

  @observable public selected?: Documentation
  @observable public selectedVersion = Object.keys(versions)[0] as Version

  public init() {}

  public async select(version: Version | "latest") {
    if (this.selected && this.selected.version) {
      return this.selected
    }

    const safeVersion = version === "latest" ? this.versions[0] : version
    const filename = this.versionMap[safeVersion]

    if (!filename) return

    if (IS_SERVER) {
      this.selected = eval("require")(`../../../../../../../../doc-repo/${filename}`)
    } else {
      // prettier-ignore
      this.selected = await import(`../../../../../doc-repo/${filename}` /*
        webpackChunkName: "[request]"
      */)
    }
  }

  @computed
  public get categories() {
    const documentation = ensureValue(this.selected)

    const categoryMap: Record<string, ModuleDescriptor<ModuleKind>[]> = {}

    for (const descriptor of documentation.modules) {
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

  public serialize() {
    return {
      selected: this.selected,
      selectedVersion: this.selectedVersion
    }
  }

  public hydrate(data: SerializedDocumentationStore) {
    const { selected, selectedVersion } = data

    this.selected = selected
    this.selectedVersion = selectedVersion
  }
}

export const documentationStore = () => new DocumentationStore()
