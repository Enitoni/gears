import { Bot } from "../../bot/classes"
import { MockClientMessage } from "../../bot/mocks"
import { ServiceClass, ServiceManager } from "../classes"

export const getMockServiceManager = (
  bot: Bot<MockClientMessage>,
  services: ServiceClass<MockClientMessage>[] = []
) => new ServiceManager<MockClientMessage>(bot, services)
