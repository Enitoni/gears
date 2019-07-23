import React from "react"
import { StoreManager } from "../classes/StoreManager"
import { Stores } from "../manager"

export const ManagerContext = React.createContext<StoreManager<Stores> | undefined>(
  undefined
)
