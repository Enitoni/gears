import versions from "../../../../../doc-repo/index.json"
import { IS_SERVER } from "../../core/constants"

import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { Documentation } from "../types/Documentation"
import { DocumentationModel } from "../models/DocumentationModel"

export type Version = keyof typeof versions

export interface SerializedDocumentationStore {
  selected?: Documentation
}

class DocumentationStore implements InitializableStore<SerializedDocumentationStore> {
  public versionMap = versions
  public versions = Object.keys(versions) as Version[]

  private selected?: DocumentationModel

  public init() {}

  private async fetchDocumentation(version: Version) {
    const filename = this.versionMap[version]
    if (!filename) return

    if (IS_SERVER) {
      return new DocumentationModel(
        eval("require")(`../../../../../../../../doc-repo/${filename}`)
      )
    } else {
      // prettier-ignore
      return new DocumentationModel(await import(`../../../../../doc-repo/${filename}` /*
        webpackChunkName: "[request]"
      */))
    }
  }

  public async getVersion(version: Version) {
    const documentation = await this.fetchDocumentation(version)

    if (documentation) {
      this.selected = documentation
      return documentation
    }
  }

  public get latestVersion() {
    return this.versions[0]
  }

  public serialize() {
    return {
      selected: this.selected && this.selected.data
    }
  }

  public hydrate(data: SerializedDocumentationStore) {
    const { selected } = data

    if (selected) {
      this.selected = new DocumentationModel(selected)
    }
  }
}

export const documentationStore = () => new DocumentationStore()
