import { Bot } from "../../bot/classes"
import { MockClientMessage } from "../../bot/mocks"
import { ServiceClass, ServiceManager } from "../classes"

export const getMockServiceManager = (
  bot: Bot<MockClientMessage, MockClientMessage>,
  services: ServiceClass<MockClientMessage, MockClientMessage>[] = []
) => new ServiceManager<MockClientMessage, MockClientMessage>(bot, services)
