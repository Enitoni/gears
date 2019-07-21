import { Matcher } from "../types"

/**
 * Matches at random
 * @param chance Chance of matching, between 0 and 1
 * @category Matching
 */
export const matchRandomly = (chance = 0.5): Matcher => context => {
  if (Math.random() < chance) return context
}
