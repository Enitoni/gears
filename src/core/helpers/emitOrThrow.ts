import { Emitter } from "../classes"

type ErrorEmitter = Emitter<{ error: any }>

export const emitOrThrow = <T extends ErrorEmitter>(
  emitter: T,
  emit: ErrorEmitter["emit"],
  error: any
) => {
  if (emitter.hasListeners("error")) {
    emit("error", error)
  } else {
    throw error
  }
}
