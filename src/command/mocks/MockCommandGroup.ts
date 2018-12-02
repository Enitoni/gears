import { MockClient, MockClientMessage } from "../../bot/mocks"
import { CommandGroup, CommandGroupClass } from "../classes"

export const MockCommandGroup: CommandGroupClass<
  MockClientMessage,
  MockClient
> = CommandGroup
export type MockCommandGroupInstance = CommandGroup<MockClientMessage, MockClient>
