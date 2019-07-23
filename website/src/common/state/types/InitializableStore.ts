import { StoreManager } from "../classes/StoreManager"
import { Stores } from "../manager"

export interface InitializableStore<T = any> {
  init: (manager: StoreManager<Stores>) => Promise<void> | void
  reset?: () => void
  hydrate?: (data: T) => void
  serialize?: () => T
}
