import { Emitter } from "../classes"

export const emitOrThrow = <T extends object>(
  emitter: Emitter<T>,
  type: keyof T,
  error: any
) => {
  if (emitter.hasListeners(type)) {
    emitter.emit(type, error)
  } else {
    throw error
  }
}
