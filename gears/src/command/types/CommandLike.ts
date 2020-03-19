import { CommandGroup, Command } from "../classes"

/**
 * Represents either a CommandGroup or a Command
 * @category Internal
 */
export type CommandLike<M, C> = CommandGroup<M, C> | Command<M, C>
