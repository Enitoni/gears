import { StoreManager } from "./classes/StoreManager"

import { routingStore } from "../routing/stores/routingStore"
import { metaStore } from "../../modules/core/stores/metaStore"
import { documentationStore } from "../../modules/docs/stores/documentationStore"

export const manager = new StoreManager({
  documentationStore,
  routingStore,
  metaStore
})
