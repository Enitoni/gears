import { Bot } from "../../bot/classes/Bot"
import { ServiceManager } from "../../service/classes"

export interface BaseContext<M> {
  content: string
  message: M
  manager: ServiceManager<M>
  bot: Bot<M>
}

export type Context<D = unknown, M = any> = BaseContext<M> & D
