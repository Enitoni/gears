import { Emitter } from "../../core/classes"

export interface AdapterEvents<M> {
  message: M
  connect: void
  reconnecting: void
  disconnect: void
  error: any
}

export interface AdapterHooks<M> {
  message: (message: M) => void
  connect: () => void
  reconnecting: () => void
  disconnect: () => void
  error: (error: any) => void
}

export interface AdapterResult<C, M> {
  client: C
  methods: {
    start: () => Promise<void>
    getMessageContent: (message: M) => string
  }
}

export abstract class ClientAdapter<C = unknown, CO = unknown, M = unknown>
  extends Emitter<AdapterEvents<M>>
  implements AdapterResult<C, M> {
  public client: C
  public methods: AdapterResult<C, M>["methods"]

  constructor(options: CO) {
    super()

    const { client, methods } = this.register(options, {
      message: message => this.emit("message", message),
      connect: () => this.emit("connect", undefined),
      reconnecting: () => this.emit("reconnecting", undefined),
      disconnect: () => this.emit("disconnect", undefined),
      error: error => this.emit("error", error)
    })

    this.client = client
    this.methods = methods
  }

  protected abstract register(options: CO, hooks: AdapterHooks<M>): AdapterResult<C, M>
}
