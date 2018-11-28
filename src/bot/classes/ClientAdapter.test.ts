import { MockAdapter, MockClientMessage } from "../mocks"

test("ClientAdapter", done => {
  const adapter = new MockAdapter(undefined)

  const handleConnect = jest.fn()
  const handleReconnecting = jest.fn()
  const handleDisconnect = jest.fn()
  const handleError = jest.fn()

  const handleMessage = (message: MockClientMessage) => {
    expect(message.content).toBe("Hello")

    expect(handleConnect).toBeCalled()
    expect(handleReconnecting).toBeCalled()
    expect(handleDisconnect).toBeCalled()
    expect(handleError).toBeCalled()

    done()
  }

  adapter.on("connect", handleConnect)
  adapter.on("reconnecting", handleReconnecting)
  adapter.on("disconnect", handleDisconnect)
  adapter.on("error", handleError)
  adapter.on("message", handleMessage)

  adapter.methods.start()
})
