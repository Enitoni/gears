import { BotContext } from "../../bot/classes"
import { getMockBot } from "../../bot/mocks/getMockBot"
import { MockClient, MockClientMessage } from "../../bot/mocks/MockClient"
import { getMockServiceManager } from "../../service/mocks"

export const getMockContext = (message: MockClientMessage): MockContext => {
  const bot = getMockBot()
  const manager = getMockServiceManager(bot)

  return {
    content: message,
    manager,
    message,
    bot
  }
}

export type MockContext = BotContext<MockClientMessage, MockClient>
