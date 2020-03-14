import { Command } from "../classes/Command"

/**
 * The data passed to a "repsonse" event
 * @category Command
 */
export interface CommandResponseEvent<M, C> {
  response: any
  command: Command<M, C>
  message: M
}
