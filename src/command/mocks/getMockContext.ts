import { getMockBot } from "../../bot/mocks/getMockBot"
import { MockClient, MockClientMessage } from "../../bot/mocks/MockClient"
import { getMockServiceManager } from "../../service/mocks"
import { Context } from "../types"

export const getMockContext = (message: MockClientMessage): MockContext => {
  const bot = getMockBot()
  const manager = getMockServiceManager(bot)

  return {
    content: message,
    manager,
    message,
    bot
  } as MockContext
}

export type MockContext = Context<{}, MockClientMessage, MockClient>
