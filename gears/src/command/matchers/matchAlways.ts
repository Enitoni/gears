import { Matcher } from "../types"

/**
 * Match any message
 * @example
 * matchAlways()
 *
 * // Matching: "Hi"
 * // Matching: "How are you?"
 * // Matching: "I see, you're just gonna match all of these, huh?"
 * // Matching: "alisdkufhgsdikufhgsdiku"
 * @category Matching
 */
export const matchAlways = (): Matcher => context => context
