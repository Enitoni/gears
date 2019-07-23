import { manager } from "../manager"

export const hydrateStores = () => {
  const data = document.querySelector("[data-store-hydration=true]")

  if (data) {
    const safe = (data.innerHTML || "{}")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")

    console.log(safe)

    manager.hydrate(JSON.parse(safe))
  }
}
