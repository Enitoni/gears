import { bind } from "decko"
import { CommandGroup } from "../../command/classes"
import { composeMiddleware } from "../../command/helpers"
import { BaseContext, Middleware } from "../../command/types"
import { Emitter } from "../../core/classes"
import { emitOrThrow } from "../../core/helpers"
import { ServiceClass, ServiceManager } from "../../service/classes"
import { ClientAdapter } from "./ClientAdapter"

export interface BotEvents {
  response: any
  error: any
}

export interface BotOptions<M, C> {
  adapter: ClientAdapter<C, M>
  group: CommandGroup<M, C>
  services?: ServiceClass<M, C>[]
}

export class Bot<M, C> extends Emitter<BotEvents> {
  private adapter: ClientAdapter<C, M>

  public readonly group: CommandGroup<M, C>
  public readonly manager: ServiceManager<M, C>

  constructor(options: BotOptions<M, C>) {
    super()

    const { adapter, group, services = [] } = options

    this.adapter = adapter
    this.group = group
    this.manager = new ServiceManager<M, C>(this, services)

    this.adapter.on("message", this.processMessage)
    this.adapter.on("error", this.handleError)
    this.adapter.on("ready", this.handleReady)
    this.adapter.on("unready", this.handleUnready)
  }

  public async start() {
    await this.manager._initialize()
    await this.adapter.methods.start()
  }

  @bind
  public async processMessage(message: M) {
    const content = this.adapter.methods.getMessageContent(message)
    const context: BaseContext<M, C> = {
      bot: this,
      manager: this.manager,
      message,
      content
    }

    const chain = await this.group.getChain(context)

    if (chain) {
      const middleware: Middleware<unknown, M, C>[] = []

      for (const command of chain.commands) {
        middleware.push(...command.middleware)
      }

      const run = composeMiddleware(middleware)

      try {
        const response = await run(chain.context)
        if (response) this.emit("response", response)
      } catch (error) {
        this.handleError(error)
      }
    }
  }

  @bind
  private async handleReady() {
    await this.manager._start()
  }

  @bind
  private async handleUnready() {
    await this.manager._stop()
  }

  @bind
  private handleError(error: any) {
    emitOrThrow(this, "error", error)
  }

  public get client() {
    return this.adapter.client
  }
}
