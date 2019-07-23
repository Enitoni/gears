import { InitializableStore } from "../types/InitializableStore"

export class StoreManager<T extends Record<string, InitializableStore>> {
  public stores: T = {} as any

  constructor(public instantiators: { [K in keyof T]: () => T[K] }) {
    for (const [name, creator] of Object.entries(instantiators)) {
      this.stores[name as keyof T] = creator()
    }
  }

  public async init() {
    await Promise.all(Object.values(this.stores).map(x => x.init(this as any)))
  }

  public reset() {
    for (const store of Object.values(this.stores)) {
      if (store.reset) store.reset()
    }
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
