import { InitializableStore } from "../types/InitializableStore"

export class StoreManager<T extends Record<string, InitializableStore>> {
  constructor(public stores: T) {}

  public async init() {
    console.info("Initializing stores")
    await Promise.all(Object.values(this.stores).map(x => x.init()))
  }

  public reset() {
    Object.values(this.stores).map(x => x.reset)
  }
}
