import { CommandMatcher } from "../types"

/**
 * Match any message
 * @category Matching
 */
export const matchAlways = (): CommandMatcher => context => context
