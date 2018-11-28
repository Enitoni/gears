import { MockAdapter, MockClientMessage } from "../mocks"

test("ClientAdapter", done => {
  const adapter = new MockAdapter(undefined)

  const handleConnect = jest.fn()
  const handleDisconnect = jest.fn()
  const handleError = jest.fn()

  const handleMessage = (message: MockClientMessage) => {
    expect(message.content).toBe("Hello")

    expect(handleConnect).toBeCalled()
    expect(handleDisconnect).toBeCalled()
    expect(handleError).toBeCalled()

    done()
  }

  adapter.on("ready", handleConnect)
  adapter.on("unready", handleDisconnect)
  adapter.on("error", handleError)
  adapter.on("message", handleMessage)

  adapter.methods.start()
})
