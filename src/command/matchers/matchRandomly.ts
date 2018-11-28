import { CommandMatcher } from "../types"

export const matchRandomly = (chance = 0.5): CommandMatcher => async context => {
  const doesMatch = Math.random() < chance
  if (doesMatch) return context
}
