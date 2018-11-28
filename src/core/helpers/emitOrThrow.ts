import { Emitter } from "../classes"

export interface ErrorEvents {
  error: any
}

export const emitOrThrow = <T extends ErrorEvents>(emitter: Emitter<T>, error: any) => {
  if (emitter.hasListeners("error")) {
    emitter.emit("error", error)
  } else {
    throw error
  }
}
