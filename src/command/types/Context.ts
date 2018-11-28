import { Bot } from "../../bot/classes/Bot"

export interface BaseContext<M> {
  message: M
  content: string
  rawContent: string
  bot: Bot<M>
}

export type Context<D = {}, M = any> = BaseContext<M> & D
