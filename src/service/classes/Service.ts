import { Bot } from "../../bot/classes"
import { ServiceManager } from "./ServiceManager"

export interface ServiceOptions<M, C> {
  bot: Bot<M, C>
  manager: ServiceManager<M, C>
}

export class Service<M, C> {
  private didStart = false

  protected bot: Bot<M, C>
  protected manager: ServiceManager<M, C>

  constructor(options: ServiceOptions<M, C>) {
    const { bot, manager } = options

    this.bot = bot
    this.manager = manager
  }

  public async _initialize() {
    await this.serviceDidInitialize()
  }

  public async _start() {
    if (this.didStart) {
      await this.serviceDidRestart()
    } else {
      this.didStart = true
      await this.serviceDidStart()
    }
  }

  public async _stop() {
    await this.serviceDidStop()
  }

  /** Hook called when the service has initialized, but the bot is ready */
  protected async serviceDidInitialize() {}

  /** Hook called when the service has started and the bot is ready */
  protected async serviceDidStart() {}

  /** Hook called when the service has started after stopping */
  protected async serviceDidRestart() {}

  /** Hook called when the service has stopped and the bot is offline */
  protected async serviceDidStop() {}
}

export type ServiceClass<M, C> = new (options: ServiceOptions<M, C>) => Service<M, C>
