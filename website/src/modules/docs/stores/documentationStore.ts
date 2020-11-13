import versions from "../../../../../doc-repo/index.json"
import { IS_SERVER } from "../../core/constants"

import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { Documentation } from "../types/Documentation"
import { DocumentationModel } from "../models/DocumentationModel"
import { observable } from "mobx"
import { compare } from "semver"

export type Version = keyof typeof versions

export interface SerializedDocumentationStore {
  selected?: Documentation
  status: DocumentationStoreStatus
}

export enum DocumentationStoreStatus {
  Idle,
  Fetching,
  Error,
  NotFound,
}

class DocumentationStore implements InitializableStore<SerializedDocumentationStore> {
  public versionMap = versions
  public versions = Object.keys(versions).sort((a, b) => compare(b, a)) as Version[]

  @observable public status = DocumentationStoreStatus.Idle
  @observable public selected?: DocumentationModel

  public init() {}

  private async fetchDocumentation(version: Version) {
    const filename = this.versionMap[version]
    if (!filename) return

    if (IS_SERVER) {
      return new DocumentationModel(
        eval("require")(`../../../../../../../../doc-repo/${filename}`),
      )
    } else {
      // prettier-ignore
      return new DocumentationModel(await import(`../../../../../doc-repo/${filename}` /*
        webpackChunkName: "[request]"
      */))
    }
  }

  public async getVersion(version: Version) {
    if (this.selected && this.selected.version === version) {
      return this.selected
    }

    this.status = DocumentationStoreStatus.Fetching

    const documentation = await this.fetchDocumentation(version)

    if (documentation) {
      this.status = DocumentationStoreStatus.Idle
      this.selected = documentation
      return documentation
    } else {
      this.selected = undefined
      this.status = DocumentationStoreStatus.NotFound
    }
  }

  public get latestVersion() {
    return this.versions[0]
  }

  public serialize() {
    return {
      selected: this.selected && this.selected.data,
      status: this.status,
    }
  }

  public hydrate(data: SerializedDocumentationStore) {
    const { selected, status } = data

    if (selected) {
      this.selected = new DocumentationModel(selected)
    }

    this.status = status
  }
}

export const documentationStore = () => new DocumentationStore()
