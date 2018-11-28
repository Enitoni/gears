import { Bot } from "../../bot/classes/Bot"

export interface BaseContext<M, B = Bot<M>> {
  message: M
  content: string
  rawContent: string
  bot: B
}

export type Context<D = {}, M = any, B = Bot<M>> = BaseContext<M, B> & D
