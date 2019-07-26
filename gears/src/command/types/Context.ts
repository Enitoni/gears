import { Bot } from "../../bot/classes/Bot"
import { ServiceManager } from "../../service/classes"
import { Command, CommandGroup } from "../classes"

/**
 * Context before passed to the tree
 * @category Internal
 */
export interface BaseContext<M, C, S = {}> {
  content: string
  message: M
  manager: ServiceManager<M, C>
  bot: Bot<M, C>
  state: S
}

/**
 * An object passed to [[Middleware]] and [[Matcher]]. Contains [[Bot]], [[ServiceManager]], the message and its content, and the state.
 * @template S State
 * @template M Message
 * @template C Client
 * @category Command
 */
export interface Context<S = any, M = any, C = any> extends BaseContext<M, C, S> {
  issuer: Command<M, C> | CommandGroup<M, C>
}
