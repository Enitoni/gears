export interface InitializableStore {
  init: () => Promise<void> | void
  reset?: () => void
}
