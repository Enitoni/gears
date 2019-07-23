import versions from "../../../../../doc-repo/index.json"

import { IS_SERVER } from "../../core/constants"
import { observable } from "mobx"

import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { Documentation } from "../types/Documentation"

export type Version = keyof typeof versions

export interface SerializedDocumentationStore {
  selected?: Documentation
  selectedVersion: Version
}

class DocumentationStore implements InitializableStore<SerializedDocumentationStore> {
  public versions = versions

  @observable public selected?: Documentation
  @observable public selectedVersion = Object.keys(versions)[0] as Version

  public init() {}

  public async select(version: Version) {
    const filename = this.versions[version]

    if (this.selected && this.selected.version) {
      return this.selected
    }

    if (IS_SERVER) {
      this.selected = eval("require")(`../../../../../../../../doc-repo/${filename}`)
    } else {
      this.selected = await import(
        /* webpackChunkName: "[request]" */ `../../../../../doc-repo/${filename}`
      )
    }
  }

  public serialize() {
    const { selected, selectedVersion } = this
    return { selected, selectedVersion }
  }

  public hydrate(data: SerializedDocumentationStore) {
    const { selected, selectedVersion } = data

    this.selected = selected
    this.selectedVersion = selectedVersion
  }
}

export const documentationStore = () => new DocumentationStore()
