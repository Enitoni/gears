import { Bot } from "../../bot/classes/Bot"

export interface BaseContext<M, B = Bot<M>> {
  content: string
  message: M
  bot: B
}

export type Context<D = {}, M = any, B = Bot<M>> = BaseContext<M, B> & D
