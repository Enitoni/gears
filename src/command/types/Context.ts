import { Bot } from "../../bot/classes/Bot"
import { ServiceManager } from "../../service/classes"

export interface BaseContext<M, B = Bot<M>> {
  content: string
  message: M
  manager: ServiceManager<M>
  bot: B
}

export type Context<D = {}, M = any, B = Bot<M>> = BaseContext<M, B> & D
