import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { IS_SERVER } from "../constants"

class SSRStore implements InitializableStore {
  public promises: Promise<any>[] = []

  public init() {}

  public reset() {
    this.promises = []
  }

  public register(promise: Promise<any>) {
    if (IS_SERVER) {
      this.promises.push(promise)
    }

    return promise
  }
}

export const ssrStore = () => new SSRStore()
