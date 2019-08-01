import { InitializableStore } from "../../../common/state/types/InitializableStore"
import { IS_SERVER } from "../constants"

export interface VirtualViewport {
  width: number
  height: number
}

class SSRStore implements InitializableStore {
  public viewport: VirtualViewport = {
    width: 1920,
    height: 1080,
  }

  public promises: Promise<any>[] = []
  public lazy = false

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

  public async waitFor() {
    await Promise.all(this.promises)
    this.promises = []
  }
}

export const ssrStore = () => new SSRStore()
