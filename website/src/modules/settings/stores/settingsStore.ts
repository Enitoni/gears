import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { observable } from "mobx"

class SettingsStore implements InitializableStore {
  public init() {}

  @observable public darkTheme?: boolean
  @observable public typescript = false
}

export const settingsStore = () => new SettingsStore()
