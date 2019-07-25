import { InitializableStore } from "../../state/types/InitializableStore"
import { observable } from "mobx"
import { Category } from "../components/CategoryNavigation"

export interface SerializedSidebarStore {
  open: boolean
  categories: Category[]
}

class SidebarStore implements InitializableStore<SerializedSidebarStore> {
  public init() {}

  @observable open = true
  @observable categories: Category[] = []

  public serialize() {
    return {
      open: this.open,
      categories: this.categories
    }
  }

  public hydrate(data: SerializedSidebarStore) {
    this.open = data.open
    this.categories = data.categories
  }
}

export const sidebarStore = () => new SidebarStore()
