import { Bot } from "../../bot/classes"
import { ServiceManager } from "./ServiceManager"
import {
  SERVICE_CONSTRUCTOR,
  SERVICE_INITIALIZE,
  SERVICE_START,
  SERVICE_STOP
} from "../symbols"

export interface ServiceOptions<M, C> {
  bot: Bot<M, C>
  manager: ServiceManager<M, C>
}

export class Service<M, C> {
  private didStart = false

  protected bot: Bot<M, C>
  protected manager: ServiceManager<M, C>

  constructor(options: ServiceOptions<M, C>, s: symbol) {
    if (s !== SERVICE_CONSTRUCTOR)
      throw new Error(
        "Manually instantiating a service is not allowed, add your service class to the services array on your bot."
      )

    const { bot, manager } = options

    this.bot = bot
    this.manager = manager
  }

  public async [SERVICE_INITIALIZE]() {
    await this.serviceDidInitialize()
  }

  public async [SERVICE_START]() {
    if (this.didStart) {
      await this.serviceDidRestart()
    } else {
      this.didStart = true
      await this.serviceDidStart()
    }
  }

  public async [SERVICE_STOP]() {
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
