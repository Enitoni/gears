import { useManager } from "./useManager"

export const useStores = () => {
  return useManager().stores
}
