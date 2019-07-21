import { bind } from "decko"
import { CommandGroup, Command } from "../../command/classes"
import { composeChain } from "../../command/helpers"
import { BaseContext, CommandLike } from "../../command/types"
import { Emitter } from "../../core/classes"
import { emitOrThrow } from "../../core/helpers"
import { ServiceManager, ServiceType } from "../../service/classes"
import { ClientAdapter } from "./ClientAdapter"
import { MANAGER_INITIALIZE, MANAGER_START, MANAGER_STOP } from "../../service/symbols"

/**
 * Events fired by a [[Bot]] instance
 * @category Bot
 */
export interface BotEvents<M, C> {
  command: [Command<M, C>, M]
  response: any
  error: any
}

/**
 * Options passed to the [[Bot]] constructor.
 * @category Bot
 */
export interface BotOptions<M, C> {
  adapter: ClientAdapter<C, M>
  group: CommandGroup<M, C>
  services?: ServiceType<M, C>[]
}

/**
 * Starting point for your bot. Contains the [[ServiceManager]] and the root [[CommandGroup]].
 * @category Bot
 */
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

  /**
   * Asynchronously starts the bot
   */
  public async start() {
    await this.manager[MANAGER_INITIALIZE]()
    await this.adapter.methods.start()
  }

  /**
   * Manually run a message through the command chain. This method gets called automatically by the [[ClientAdapter]].
   */
  public processMessage = async (message: M) => {
    const content = this.adapter.methods.getMessageContent(message)
    const context: BaseContext<M, C> = {
      manager: this.manager,
      state: {},
      bot: this,
      message,
      content
    }

    const chain = await this.group.getChain(context)

    if (chain) {
      const run = composeChain(chain)

      const command = chain[chain.length - 1].command as Command<M, C>
      this.emit("command", [command, message])

      try {
        const response = await run()
        if (response) this.emit("response", response)
      } catch (error) {
        this.handleError(error)
      }
    }
  }

  @bind
  private async handleReady() {
    await this.manager[MANAGER_START]()
  }

  @bind
  private async handleUnready() {
    await this.manager[MANAGER_STOP]()
  }

  @bind
  private handleError(error: any) {
    emitOrThrow(this, "error", error)
  }

  /**
   * Get the client from the adapter
   */
  public get client() {
    return this.adapter.client
  }
}
