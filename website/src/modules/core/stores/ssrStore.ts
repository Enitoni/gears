import { InitializableStore } from "../../../common/state/types/InitializableStore"

class SSRStore implements InitializableStore {
  public promises: Promise<any>[] = []

  public init() {}

  public reset() {
    this.promises = []
  }

  public register(promise: Promise<any>) {
    this.promises.push(promise)
    return promise
  }
}

export const ssrStore = new SSRStore()
