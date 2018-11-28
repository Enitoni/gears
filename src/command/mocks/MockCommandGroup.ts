import { CommandGroup, CommandGroupClass } from "../classes"
import { MockContext } from "./getMockContext"

export const MockCommandGroup: CommandGroupClass<MockContext> = CommandGroup
export type MockCommandGroupInstance = CommandGroup<MockContext>
