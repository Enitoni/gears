import { Bot } from "../../bot/classes/Bot"
import { ServiceManager } from "../../service/classes"
import { Command, CommandGroup } from "../classes"

/**
 * Context before passed to the tree
 * @category Internal
 */
export interface BaseContext<M, C, D = {}> {
  content: string
  message: M
  manager: ServiceManager<M, C>
  bot: Bot<M, C>
  state: D
}

/**
 * An object passed to [[Middleware]] and [[Matcher]]. Contains [[Bot]], [[ServiceManager]], the message and its content, and the state.
 * @category Command
 */
export interface Context<D = any, M = any, C = any> extends BaseContext<M, C, D> {
  issuer: Command<M, C> | CommandGroup<M, C>
}
