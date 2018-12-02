import { bind } from "decko"
import { CommandGroup } from "../../command/classes"
import { CommandError } from "../../command/classes/CommandError"
import { Context, MatchResult } from "../../command/types"
import { Emitter } from "../../core/classes"
import { emitOrThrow } from "../../core/helpers"
import { ServiceClass, ServiceManager } from "../../service/classes"
import { ClientAdapter } from "./ClientAdapter"

export interface BotEvents<M, C> {
  match: MatchResult<M, C>
  commandError: CommandError<M, C>
  response: any
  error: any
}

export interface BotOptions<M, C> {
  adapter: ClientAdapter<C, M>
  group: CommandGroup<M, C>
  services?: ServiceClass<M, C>[]
}

export type BotContext<M, C> = Context<unknown, M, C>

export class Bot<M, C> extends Emitter<BotEvents<M, C>> {
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
    const context: BotContext<M, C> = {
      bot: this,
      manager: this.manager,
      message,
      content
    }

    const result = await this.group.getMatch(context)
    if (result) await this.useResult(result)
  }

  private async useResult(result: MatchResult<M, C>) {
    const { command, context } = result
    this.emit("match", result)

    try {
      const response = await command.run(context)
      this.emit("response", response)
    } catch (error) {
      this.handleCommandError(error, result)
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

  @bind
  private handleCommandError(error: any, result: MatchResult<M, C>) {
    error = new CommandError(result, error)
    emitOrThrow(this, "commandError", error)
  }

  public get client() {
    return this.adapter.client
  }
}
