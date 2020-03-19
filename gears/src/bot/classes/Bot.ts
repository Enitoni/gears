import { CommandGroup, Command } from "../../command/classes"
import { composeChain } from "../../command/helpers"
import { BaseContext } from "../../command/types"
import { Emitter } from "../../core/classes"
import { emitOrThrow } from "../../core/helpers"
import { ServiceManager, ServiceType } from "../../service/classes"
import { ClientAdapter } from "./ClientAdapter"
import { MANAGER_INITIALIZE, MANAGER_START, MANAGER_STOP } from "../../service/symbols"
import { matchAlways } from "../../command/matchers/matchAlways"
import { CommandResponseEvent } from "../../command/types/CommandResponseEvent"
import { CommandLike } from "../../command/types/CommandLike"
import { VALIDATE_BEFORE_ADD } from "../../command/symbols"

/**
 * Events fired by a [[Bot]] instance
 * @category Bot
 */
export interface BotEvents<M, C> {
  /**
   * The [[Bot]] has initialized but not started.
   * Use this to add bot specific configurations via [[Service]]
   */
  init: void
  /**
   *  A [[Command]] was executed
   */
  command: [Command<M, C>, M]
  /**
   * A response was returned from the called [[Middleware]]
   */
  response: CommandResponseEvent<M, C>
  /**
   * An error occurred
   */
  error: any
}

/**
 * Options passed to the [[Bot]] constructor.
 * @category Bot
 */
export interface BotOptions<M, C> {
  adapter: ClientAdapter<M, C>
  commands?: CommandLike<M, C>[]
  services?: ServiceType<M, C>[]
}

/**
 * Starting point for your Gears app. Contains the [[ServiceManager]] and the root [[CommandGroup]]
 * @example
 * const bot = new Bot({ adapter, commands: [sum, multiply] })
 * @template M Message
 * @template C Client
 * @category Bot
 */
export class Bot<M, C> extends Emitter<BotEvents<M, C>> {
  private adapter: ClientAdapter<M, C>

  public readonly group: CommandGroup<M, C>
  public readonly manager: ServiceManager<M, C>

  constructor(options: BotOptions<M, C>) {
    super()

    const { adapter, commands = [], services = [] } = options
    this.adapter = adapter

    this.group = new CommandGroup<any, any>()
      .match(matchAlways())
      .setCommands(...commands)

    // Validate the command group
    this.group[VALIDATE_BEFORE_ADD]()

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
    this.emit("init", undefined)
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
      content,
    }

    const chain = await this.group.getChain(context)

    if (chain) {
      const run = composeChain(chain)

      const command = chain[chain.length - 1].chainer as Command<M, C>
      this.emit("command", [command, message])

      try {
        const response = await run()

        if (typeof response !== undefined) {
          const responseEvent = { response, message, command }
          this.emit("response", responseEvent)

          return responseEvent
        }
      } catch (error) {
        this.handleError(error)
      }
    }
  }

  private handleReady = async () => {
    await this.manager[MANAGER_START]()
  }

  private handleUnready = async () => {
    await this.manager[MANAGER_STOP]()
  }

  private handleError = (error: any) => {
    emitOrThrow(this, "error", error)
  }

  /**
   * Get the client from the adapter
   */
  public get client() {
    return this.adapter.client
  }
}
