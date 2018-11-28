import { Bot } from "../../bot/classes"
import { ServiceManager } from "./ServiceManager"

export class Service<M> {
  private didStart = false

  protected bot: Bot<M>
  protected manager: ServiceManager<M>

  constructor(bot: Bot<M>, manager: ServiceManager<M>) {
    this.bot = bot
    this.manager = manager
  }

  public async _initialize() {
    await this.serviceDidInitialize()
  }

  public async _start() {
    if (this.didStart) {
      await this.servicdeDidRestart()
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
  protected async servicdeDidRestart() {}

  /** Hook called when the service has stopped and the bot is offline */
  protected async serviceDidStop() {}
}

export type ServiceClass<M> = new (bot: Bot<M>, manager: ServiceManager<M>) => Service<M>
