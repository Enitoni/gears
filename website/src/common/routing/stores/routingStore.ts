import { InitializableStore } from "../../state/types/InitializableStore"
import { getIsomorphicHistory } from "../helpers/getIsomorphicHistory"
import { observable } from "mobx"
import { IS_SERVER } from "../../../modules/core/constants"

export enum HttpStatus {
  OK = 200,
  NotFound = 404,
}

class RoutingStore implements InitializableStore {
  private history = getIsomorphicHistory()
  public status = HttpStatus.OK

  @observable public location = this.history.location

  public init() {
    this.history.listen(location => {
      this.location = location
    })
  }

  public push = (path: string) => {
    if (path === this.location.pathname) return
    this.history.push(path)

    if (!IS_SERVER) {
      window.scrollTo(0, 0)
    }
  }

  public replace = (path: string) => {
    if (IS_SERVER) {
      this.location.pathname = path
    } else {
      this.history.replace(path)
    }
  }
}

export const routingStore = () => new RoutingStore()
