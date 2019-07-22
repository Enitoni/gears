import { Theme } from "../types/Theme"

export type ArrayKeys = keyof any[]

export const createHelper = <T extends keyof Theme>(type: T) => (
  key: Exclude<keyof Theme[T], ArrayKeys | "0">
) => ({ theme }: { theme: Theme }) => theme[type][key]
