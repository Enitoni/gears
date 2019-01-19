import { Bot } from "../../bot/classes"
import { MockClient, MockClientMessage } from "../../bot/mocks"
import { ServiceManager, ServiceType } from "../classes"

export const getMockServiceManager = (
  bot: Bot<MockClientMessage, MockClient>,
  services: ServiceType<MockClientMessage, MockClient>[] = []
) => new ServiceManager<MockClientMessage, MockClient>(bot, services)
