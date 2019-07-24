import { InitializableStore } from "../../state/types/InitializableStore"
import { observable } from "mobx"
import { Category } from "../components/CategoryNavigation"

class SidebarStore implements InitializableStore {
  public init() {}

  @observable open = false
  @observable categories: Category[] = []
}

export const sidebarStore = () => new SidebarStore()
