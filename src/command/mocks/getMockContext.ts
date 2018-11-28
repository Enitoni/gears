import { BotContext } from "../../bot/classes"
import { getMockBot } from "../../bot/mocks/getMockBot"
import { MockClientMessage } from "../../bot/mocks/MockClient"

export const getMockContext = (message: MockClientMessage): MockContext => ({
  bot: getMockBot(),
  content: message.content,
  message
})

export type MockContext = BotContext<MockClientMessage>
