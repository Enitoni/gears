/**
 * Can be T or Promise<T>
 * @category Internal
 */
export type PromiseResolvable<T> = Promise<T> | T
