import { Emitter } from "../../core/classes"

export interface AdapterEvents<M> {
  message: M
  ready: void
  unready: void
  error: any
}

export interface AdapterHooks<M> {
  message: (message: M) => void
  ready: () => void
  unready: () => void
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
      ready: () => this.emit("ready", undefined),
      unready: () => this.emit("unready", undefined),
      error: error => this.emit("error", error)
    })

    this.client = client
    this.methods = methods
  }

  protected abstract register(options: CO, hooks: AdapterHooks<M>): AdapterResult<C, M>
}
