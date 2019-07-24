import { Emitter } from "../../core/classes"

/**
 * Events fired by a [[ClientAdapter]]
 * @category Bot
 */
export interface AdapterEvents<M> {
  message: M
  ready: void
  unready: void
  error: any
}

/**
 * Methods for interacting with a [[ClientAdapter]] in register()
 * @category Bot
 */
export interface AdapterHooks<M> {
  message: (message: M) => void
  ready: () => void
  unready: () => void
  error: (error: any) => void
}

/**
 * The resulting interface after registering a [[ClientAdapter]]
 * @category Bot
 */
export interface AdapterResult<C, M> {
  client: C
  methods: {
    start: () => Promise<void>
    getMessageContent: (message: M) => string
  }
}

/**
 * Adapts a messaging interface so a [[Bot]] can understand it
 * @example
 * class Adapter extends ClientAdapter {
 *   protected register(options, hooks) {
 *     // Client refers to anything that exposes a messaging interface
 *     const client = new Client(options)
 *
 *     client.on("message", hooks.message)
 *     client.on("ready", hooks.ready)
 *     client.on("resume", hooks.ready)
 *     client.on("disconnect", hooks.unready)
 *     client.on("error", hooks.error)
 *
 *     return {
 *       client,
 *       methods: {
 *         start: async () => client.start(),
 *         getMessageContent: (message) => message
 *       }
 *     }
 *   }
 * }
 *
 * const adapter = new Adapter(options)
 * const bot = new Bot({ adapter, ... })
 * @template C Client
 * @template M Message
 * @category Bot
 */
export abstract class ClientAdapter<C, M = unknown, CO = unknown>
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
