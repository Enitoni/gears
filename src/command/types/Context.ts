import { Bot } from "../../bot/classes/Bot"
import { ServiceManager } from "../../service/classes"
import { Command, CommandGroup } from "../classes"

export interface BaseContext<M, C, D = {}> {
  content: string
  message: M
  manager: ServiceManager<M, C>
  bot: Bot<M, C>
  state: D
}

export interface CommandContext<M, C, D> extends BaseContext<M, C, D> {
  issuer: Command<M, C> | CommandGroup<M, C>
}

export type Context<D = {}, M = any, C = any> = CommandContext<M, C, D>
