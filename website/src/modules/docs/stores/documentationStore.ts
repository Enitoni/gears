import versions from "../../../../../doc-repo/index.json"

import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { IS_SERVER } from "../../core/constants"
import { observable } from "mobx"

class DocumentationStore implements InitializableStore {
  public versions = versions
  @observable public selected = Object.keys(versions)[0] as keyof typeof versions

  public init() {}

  public async getModules(version: keyof typeof versions) {
    const filename = this.versions[version]

    if (IS_SERVER) {
      return require(`../../../../../doc-repo/${filename}`)
    } else {
      return import(
        /* webpackChunkName: "[request]" */ `../../../../../doc-repo/${filename}`
      )
    }
  }
}

export const documentationStore = new DocumentationStore()
