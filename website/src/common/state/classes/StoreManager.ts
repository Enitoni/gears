import { InitializableStore } from "../types/InitializableStore"

export class StoreManager<T extends Record<string, InitializableStore>> {
  constructor(public stores: T) {}

  public async init() {
    console.info("Initializing stores")
    await Promise.all(Object.values(this.stores).map(x => x.init()))
  }

  public reset() {
    Object.values(this.stores).map(x => x.reset && x.reset())
  }

  public hydrate(data: any) {
    for (const [name, store] of Object.entries(this.stores)) {
      if (store.hydrate) store.hydrate(data[name])
    }
  }

  public serialize() {
    const result: Record<string, any> = {}

    for (const [name, store] of Object.entries(this.stores)) {
      if (store.serialize) {
        result[name] = store.serialize()
      }
    }

    return result
  }
}
