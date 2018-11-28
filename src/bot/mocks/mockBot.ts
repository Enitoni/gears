import { CommandGroup } from "../../command/classes"
import { Bot, BotContext } from "../classes"
import { MockAdapter } from "./MockAdapter"
import { MockClientMessage } from "./MockClient"

export interface MockBotOptions {
  group: CommandGroup<BotContext<MockClientMessage>>
}

export const getMockBot = (options: MockBotOptions) => {
  const adapter = new MockAdapter(undefined)
  const { group } = options

  return new Bot({ adapter, group })
}
