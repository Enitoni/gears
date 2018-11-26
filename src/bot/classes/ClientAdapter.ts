import { Emitter } from "../../core/classes"

export interface ClientAdapterEvents<M> {
  message: M
  connect: void
  reconnecting: void
  disconnect: void
  error: any
}

export interface ClientRegisterHooks<M> {
  message: (message: M) => void
  connect: () => void
  reconnecting: () => void
  disconnect: () => void
  error: (error: any) => void
}

export interface ClientRegisterReturn<C, M> {
  client: C
  start: () => Promise<void>
  getMessageContent: (message: M) => string
}

export abstract class ClientAdapter<Client, ClientOptions, Message = unknown>
  extends Emitter<ClientAdapterEvents<Message>>
  implements ClientRegisterReturn<Client, Message> {
  public client: Client
  public start: () => Promise<void>
  public getMessageContent: (message: Message) => string

  constructor(options: ClientOptions) {
    super()

    const { client, start, getMessageContent } = this.register(options, {
      message: message => this.emit("message", message),
      connect: () => this.emit("connect", undefined),
      reconnecting: () => this.emit("reconnecting", undefined),
      disconnect: () => this.emit("disconnect", undefined),
      error: error => this.emit("error", error)
    })

    this.client = client
    this.start = start
    this.getMessageContent = getMessageContent
  }

  protected abstract register(
    options: ClientOptions,
    hooks: ClientRegisterHooks<Message>
  ): ClientRegisterReturn<Client, Message>
}
