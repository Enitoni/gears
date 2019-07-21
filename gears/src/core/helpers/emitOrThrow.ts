import { Emitter } from "../classes"

/**
 * @ignore
 */
export const emitOrThrow = <T extends object>(
  emitter: Emitter<T>,
  type: keyof T,
  error: any
) => {
  if (emitter.hasListeners(type)) {
    emitter.emit(type, error)
  } else {
    console.error(
      `Uncaught "${type}" event. Use ${
        emitter.constructor.name
      }.on("${type}", ...) to catch these error events safely.`
    )
    throw error
  }
}
