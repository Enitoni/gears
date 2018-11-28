import { bind } from "decko"
import { CommandGroup } from "../../command/classes"
import { Context, MatchResult } from "../../command/types"
import { Emitter } from "../../core/classes"
import { emitOrThrow } from "../../core/helpers"
import { ClientAdapter } from "./ClientAdapter"

export interface BotEvents<M> {
  error: any
  match: MatchResult<BotContext<M>>
  response: any
}

export interface BotOptions<M, C extends Context> {
  adapter: ClientAdapter<unknown, unknown, M>
  group: CommandGroup<C>
}

export type BotContext<M> = Context<unknown, M, Bot<M>>

export class Bot<M> extends Emitter<BotEvents<M>> {
  private adapter: ClientAdapter<unknown, unknown, M>
  private group: CommandGroup<BotContext<M>>

  constructor(options: BotOptions<M, BotContext<M>>) {
    super()

    const { adapter, group } = options

    this.adapter = adapter
    this.group = group

    this.adapter.on("message", this.processMessage)
    this.adapter.on("error", this.handleError)
  }

  @bind
  public async processMessage(message: M) {
    const content = this.adapter.methods.getMessageContent(message)
    const context: BotContext<M> = {
      bot: this,
      message,
      content,
      rawContent: content
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
  private handleError(error: any) {
    emitOrThrow(this, this.emit, error)
  }
}
