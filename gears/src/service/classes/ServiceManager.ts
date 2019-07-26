import { Bot } from "../../bot/classes"
import { Service, ServiceOptions } from "./Service"
import {
  SERVICE_INITIALIZE,
  SERVICE_START,
  SERVICE_STOP,
  SERVICE_CONSTRUCTOR,
  MANAGER_INITIALIZE,
  MANAGER_START,
  MANAGER_STOP
} from "../symbols"

/**
 * Service class type
 * @category Service
 */
export type ServiceType<M, C, T = Service<M, C>> = new (
  options: ServiceOptions<M, C>,
  s: symbol
) => T

/**
 * Manages instantiation and lifecycles of services
 * @category Service
 */
export class ServiceManager<M, C> {
  private services: Service<M, C>[]

  constructor(bot: Bot<M, C>, services: ServiceType<M, C>[]) {
    this.services = services.map(S => {
      return new S({ bot, manager: this }, SERVICE_CONSTRUCTOR)
    })
  }

  public [MANAGER_INITIALIZE] = async () => {
    for (const service of this.services) {
      await service[SERVICE_INITIALIZE]()
    }
  }

  public [MANAGER_START] = async () => {
    for (const service of this.services) {
      await service[SERVICE_START]()
    }
  }

  public [MANAGER_STOP] = async () => {
    for (const service of this.services) {
      await service[SERVICE_STOP]()
    }
  }

  /**
   * Get a service from the manager. Will throw if service does not exist
   * @returns A [[Service]] instance
   */
  public getService = <T extends Service<M, C>>(
    serviceClass: ServiceType<M, C, T>
  ): T => {
    const service = this.services.find(s => s instanceof serviceClass)
    if (!service) throw new Error(`Service "${serviceClass.name}" not found in manager`)

    return service as T
  }

  /**
   * Check if a [[Service]] exists in the manager
   * @returns True if the service exists, false if not
   */
  public hasService = (serviceClass: ServiceType<M, C>) => {
    return !!this.services.find(s => s instanceof serviceClass)
  }
}
