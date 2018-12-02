import { Bot } from "../../bot/classes/Bot"
import { ServiceManager } from "../../service/classes"

export interface BaseContext<M, C> {
  content: string
  message: M
  manager: ServiceManager<M, C>
  bot: Bot<M, C>
}

export type Context<D = unknown, M = any, C = unknown> = BaseContext<M, C> & D
