import { Category } from "../components/CategoryNavigation"
import { useIsomorphicEffect } from "../../react/useIsomorphicEffect"
import { useStores } from "../../state/hooks/useStores"

export const useSidebar = (categories?: Category[]) => {
  const { sidebarStore } = useStores()

  useIsomorphicEffect(() => {
    const wasOpen = sidebarStore.open

    if (categories) {
      sidebarStore.categories = categories
      sidebarStore.open = true
    }

    return () => {
      sidebarStore.categories = []
      sidebarStore.open = wasOpen
    }
  }, [categories])
}
