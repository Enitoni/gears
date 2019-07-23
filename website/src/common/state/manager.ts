import { StoreManager } from "./classes/StoreManager"

import { routingStore } from "../routing/stores/routingStore"
import { metaStore } from "../../modules/core/stores/metaStore"
import { documentationStore } from "../../modules/docs/stores/documentationStore"
import { ssrStore } from "../../modules/core/stores/ssrStore"

export const manager = new StoreManager({
  documentationStore,
  routingStore,
  metaStore,
  ssrStore
})
