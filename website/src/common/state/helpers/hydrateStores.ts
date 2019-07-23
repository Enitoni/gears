import { StoreManager } from "../classes/StoreManager"

export const hydrateStores = (manager: StoreManager<any>) => {
  const data = document.querySelector("meta[property=store-hydration]") as HTMLMetaElement

  if (data) {
    const safe = data.content || "{}"

    manager.hydrate(JSON.parse(safe))
    data.remove()
  }
}
