import { getMockBot, MockClient, MockClientMessage } from "../../bot/mocks"
import { getMockServiceManager } from "../mocks"
import { Service } from "./Service"
import { MANAGER_INITIALIZE, MANAGER_START, MANAGER_STOP } from "../symbols"

test("Service", async () => {
  const didInitialize = jest.fn()
  const didStart = jest.fn()
  const didStop = jest.fn()
  const didRestart = jest.fn()

  class TestService extends Service<MockClientMessage, MockClient> {
    protected async serviceDidInitialize() {
      didInitialize()
    }

    protected async serviceDidStart() {
      didStart()
    }

    protected async serviceDidRestart() {
      didRestart()
    }

    protected async serviceDidStop() {
      didStop()
    }
  }

  const bot = getMockBot()
  const manager = getMockServiceManager(bot, [TestService])

  manager[MANAGER_INITIALIZE]()
  manager[MANAGER_START]()
  manager[MANAGER_STOP]()
  manager[MANAGER_START]()
  manager[MANAGER_STOP]()
  manager[MANAGER_START]()

  expect(() => {
    const invalidSymbol = Symbol()
    new Service({ bot, manager }, invalidSymbol)
  }).toThrow()

  expect(didInitialize).toBeCalled()
  expect(didStart).toBeCalledTimes(1)
  expect(didStop).toBeCalledTimes(2)
  expect(didRestart).toBeCalledTimes(2)
})
