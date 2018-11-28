import { bind } from "decko"
import { CommandGroup } from "../../command/classes"
import { Context, MatchResult } from "../../command/types"
import { Emitter } from "../../core/classes"
import { emitOrThrow } from "../../core/helpers"
import { ServiceClass, ServiceManager } from "../../service/classes"
import { ClientAdapter } from "./ClientAdapter"

export interface BotEvents<M> {
  match: MatchResult<BotContext<M>>
  response: any
  error: any
}

export interface BotOptions<M, C extends Context> {
  adapter: ClientAdapter<unknown, unknown, M>
  group: CommandGroup<C>
  services?: ServiceClass<M>[]
}

export type BotContext<M> = Context<unknown, M>

export class Bot<M> extends Emitter<BotEvents<M>> {
  private adapter: ClientAdapter<unknown, unknown, M>

  private group: CommandGroup<BotContext<M>>
  private manager: ServiceManager<M>

  constructor(options: BotOptions<M, BotContext<M>>) {
    super()

    const { adapter, group, services = [] } = options

    this.adapter = adapter
    this.group = group
    this.manager = new ServiceManager(this, services)

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
    const context: BotContext<M> = {
      bot: this,
      manager: this.manager,
      message,
      content
    }

    const result = await this.group.getMatch(context)
    if (result) await this.useResult(result)
  }

  private async useResult(result: MatchResult<Context>) {
    const { command, context } = result
    this.emit("match", result)

    try {
      const response = await command.run(context)
      this.emit("response", response)
    } catch (error) {
      this.handleError(error)
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
    emitOrThrow(this, error)
  }

  public get client() {
    return this.adapter.client
  }
}
