import { bind } from "decko"
import { Bot } from "../../bot/classes"
import { Service, ServiceClass } from "./Service"

export class ServiceManager<M> {
  private bot: Bot<M>
  private services: Service<M>[]

  constructor(bot: Bot<M>, services: ServiceClass<M>[]) {
    this.bot = bot
    this.services = services.map(S => new S(bot, this))
  }

  @bind
  public async _initialize() {
    for (const service of this.services) {
      await service._initialize()
    }
  }

  @bind
  public async _start() {
    for (const service of this.services) {
      await service._start()
    }
  }

  @bind
  public async _stop() {
    for (const service of this.services) {
      await service._stop()
    }
  }

  @bind
  public getService<T extends Service<M>>(serviceClass: ServiceClass<M>) {
    const service = this.services.find(s => s instanceof serviceClass)
    if (!service) throw new Error(`Service "${serviceClass.name}" not found in manager`)

    return service as T
  }

  @bind
  public hasService(serviceClass: ServiceClass<M>) {
    return !!this.services.find(s => s instanceof serviceClass)
  }
}
