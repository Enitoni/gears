import { MockClient, MockClientMessage } from "../../bot/mocks"
import { CommandGroup, CommandGroupType } from "../classes"

export const MockCommandGroup: CommandGroupType<
  MockClientMessage,
  MockClient
> = CommandGroup
export type MockCommandGroupInstance = CommandGroup<MockClientMessage, MockClient>
