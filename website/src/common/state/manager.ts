import { StoreManager } from "./classes/StoreManager"
import { routingStore } from "../routing/stores/routingStore"

export const manager = new StoreManager({
  routingStore
})
