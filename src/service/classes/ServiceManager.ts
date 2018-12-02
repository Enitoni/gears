import { bind } from "decko"
import { Bot } from "../../bot/classes"
import { Service, ServiceClass, ServiceOptions } from "./Service"

export type ServiceType<M, C, T = Service<M, C>> = new (
  options: ServiceOptions<M, C>
) => T

export class ServiceManager<M, C> {
  private services: Service<M, C>[]

  constructor(bot: Bot<M, C>, services: ServiceClass<M, C>[]) {
    this.services = services.map(
      S =>
        new S({
          bot,
          manager: this
        })
    )
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
  public getService<T extends Service<M, C>>(serviceClass: ServiceType<M, C, T>): T {
    const service = this.services.find(s => s instanceof serviceClass)
    if (!service) throw new Error(`Service "${serviceClass.name}" not found in manager`)

    return service as T
  }

  @bind
  public hasService(serviceClass: ServiceClass<M, C>) {
    return !!this.services.find(s => s instanceof serviceClass)
  }
}
