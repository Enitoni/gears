import { Matcher } from "../types"

/**
 * Match any message
 * @category Matching
 */
export const matchAlways = (): Matcher => context => context
