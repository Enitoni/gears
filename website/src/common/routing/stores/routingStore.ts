import { InitializableStore } from "../../state/types/InitializableStore"
import { createBrowserHistory } from "history"
import { observable } from "mobx"

class RoutingStore implements InitializableStore {
  private history = createBrowserHistory()
  @observable public location = this.history.location

  public init() {
    this.history.listen(location => {
      this.location = location
    })
  }

  public push = (path: string) => {
    if (path === this.location.pathname) return
    this.history.push(path)
  }
}

export const routingStore = new RoutingStore()
