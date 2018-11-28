import { Bot } from "../../bot/classes"
import { MockClientMessage } from "../../bot/mocks"
import { ServiceManager } from "../classes"

export const getMockServiceManager = (bot: Bot<MockClientMessage>) =>
  new ServiceManager<MockClientMessage>(bot, [])
