import { StoreManager } from "./classes/StoreManager"

import { routingStore } from "../routing/stores/routingStore"
import { metaStore } from "../../modules/core/stores/metaStore"
import { documentationStore } from "../../modules/docs/stores/documentationStore"
import { ssrStore } from "../../modules/core/stores/ssrStore"
import { StoreMapReturn } from "./types/StoreMapReturn"
import { sidebarStore } from "../navigation/stores/sidebarStore"
import { settingsStore } from "../../modules/settings/stores/settingsStore"

const stores = {
  documentationStore,
  settingsStore,
  routingStore,
  sidebarStore,
  metaStore,
  ssrStore
}

export type Stores = StoreMapReturn<typeof stores>
export const createManager = () => new StoreManager<Stores>(stores)
