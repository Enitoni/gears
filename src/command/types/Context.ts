import { Bot } from "../../bot/classes/Bot"
import { ServiceManager } from "../../service/classes"
import { Command, CommandGroup } from "../classes"

export interface BaseContext<M, C> {
  content: string
  message: M
  manager: ServiceManager<M, C>
  bot: Bot<M, C>
}

export interface CommandContext<M, C> extends BaseContext<M, C> {
  issuer: Command<M, C> | CommandGroup<M, C>
}

export type Context<D = unknown, M = any, C = any> = CommandContext<M, C> & D
