import { getMockBot, MockClient, MockClientMessage } from "../../bot/mocks"
import { getMockServiceManager } from "../mocks"
import { Service } from "./Service"

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

  manager._initialize()
  manager._start()
  manager._stop()
  manager._start()
  manager._stop()
  manager._start()

  expect(didInitialize).toBeCalled()
  expect(didStart).toBeCalledTimes(1)
  expect(didStop).toBeCalledTimes(2)
  expect(didRestart).toBeCalledTimes(2)
})
