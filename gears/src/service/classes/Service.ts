import { Bot } from "../../bot/classes"
import { ServiceManager } from "./ServiceManager"
import {
  SERVICE_CONSTRUCTOR,
  SERVICE_INITIALIZE,
  SERVICE_START,
  SERVICE_STOP
} from "../symbols"
import { assert } from "../../core/helpers"

/**
 * Options passed to the [[Service]] constructor
 * @category Service
 */
export interface ServiceOptions<M, C> {
  bot: Bot<M, C>
  manager: ServiceManager<M, C>
}

/**
 * Stateful business logic living outside of [[Middleware]]
 * @example
 * class IncrementService extends Service {
 *   serviceDidInitialize() {
 *     this.counter = 0
 *     this.increment = () => this.counter++
 *   }
 * }
 *
 * const command = new CommandBuilder()
 *   .match(matchPrefixes("increment"))
 *   .use((context) => {
 *     const { manager } = context
 *
 *     const service = manager.getService(IncrementService)
 *     service.increment()
 *
 *     console.log("The counter is now", service.counter)
 *   })
 *   .done()
 *
 * const bot = new Bot({
 *   services: [IncrementService],
 *   commands: [command],
 * })
 *
 * // Input: "increment"
 * // Output: "The counter is now 1"
 *
 * // Input: "increment"
 * // Output: "The counter is now 2"
 * @template M Message
 * @template C Client
 * @category Service
 */
export class Service<M, C> {
  private didStart = false

  protected bot: Bot<M, C>
  protected manager: ServiceManager<M, C>

  /**
   * @warning Do not manually instantiate a service. Services are automatically instantiated by the [[ServiceManager]]
   */
  constructor(options: ServiceOptions<M, C>, s: symbol) {
    assert(
      s === SERVICE_CONSTRUCTOR,
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

  /**
   * Hook called when the service has initialized, but the bot is ready
   */
  protected serviceDidInitialize(): Promise<void> | void {}

  /**
   * Hook called when the service has started and the bot is ready
   */
  protected serviceDidStart(): Promise<void> | void {}

  /**
   * Hook called when the service has started after stopping
   */
  protected serviceDidRestart(): Promise<void> | void {}

  /**
   * Hook called when the service has stopped and the bot is offline
   */
  protected serviceDidStop(): Promise<void> | void {}
}
