import { InitializableStore } from "./InitializableStore"

export type StoreMapReturn<T extends Record<string, () => InitializableStore>> = {
  [K in keyof T]: ReturnType<T[K]>
}
