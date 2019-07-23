export interface InitializableStore<T = any> {
  init: () => Promise<void> | void
  reset?: () => void
  hydrate?: (data: T) => void
  serialize?: () => T
}
