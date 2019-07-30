import { observable } from "mobx"
import { InitializableStore } from "../../../common/state/types/InitializableStore"

export interface MetaInformation {
  title: string
  description: string
  thumb: string
}

const DEFAULT: MetaInformation = {
  title: "Gears",
  thumb: "logo",
  description:
    "Gears is a library used to create command interfaces, such as chat bots and more"
}

class MetaStore implements InitializableStore {
  @observable public value = DEFAULT

  public init() {}

  public reset() {
    this.value = DEFAULT
  }

  public setValue(newValue: Partial<MetaInformation>) {
    this.value = { ...DEFAULT, ...newValue }
  }
}

export const metaStore = () => new MetaStore()
