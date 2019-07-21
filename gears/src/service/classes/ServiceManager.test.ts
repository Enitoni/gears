import { getMockBot, MockClient, MockClientMessage } from "../../bot/mocks"
import { getMockServiceManager } from "../mocks"
import { Service } from "./Service"

class FakeService extends Service<MockClientMessage, MockClient> {}

test("ServiceManager", () => {
  const bot = getMockBot()
  const manager = getMockServiceManager(bot, [Service])

  expect(manager.getService(Service)).toBeInstanceOf(Service)
  expect(() => manager.getService(FakeService)).toThrow()

  expect(manager.hasService(Service)).toBe(true)
  expect(manager.hasService(FakeService)).toBe(false)
})
