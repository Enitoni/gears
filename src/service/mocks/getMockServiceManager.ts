import { Bot } from "../../bot/classes"
import { MockClient, MockClientMessage } from "../../bot/mocks"
import { ServiceClass, ServiceManager } from "../classes"

export const getMockServiceManager = (
  bot: Bot<MockClientMessage, MockClient>,
  services: ServiceClass<MockClientMessage, MockClient>[] = []
) => new ServiceManager<MockClientMessage, MockClient>(bot, services)
