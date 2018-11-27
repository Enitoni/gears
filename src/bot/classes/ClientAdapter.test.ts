import { Emitter } from "../../core/classes"
import { AdapterHooks, ClientAdapter } from "./ClientAdapter"

interface Message {
  content: string
}

interface TestClientEvents {
  message: Message
  connect: undefined
  reconnecting: undefined
  disconnect: undefined
  error: any
}

class TestClient extends Emitter<TestClientEvents> {
  async start() {
    this.emit("connect", undefined)
    this.emit("reconnecting", undefined)
    this.emit("disconnect", undefined)
    this.emit("error", new Error("Failed to reconnect"))
    this.emit("message", {
      content: "Hello"
    })
  }
}

class TestAdapter extends ClientAdapter<TestClient, undefined, Message> {
  protected register(options: undefined, hooks: AdapterHooks<Message>) {
    const client = new TestClient()

    client.on("message", hooks.message)
    client.on("connect", hooks.connect)
    client.on("reconnecting", hooks.reconnecting)
    client.on("disconnect", hooks.disconnect)
    client.on("error", hooks.error)

    return {
      client,
      methods: {
        start: () => client.start(),
        getMessageContent: (message: Message) => message.content
      }
    }
  }
}

test("ClientAdapter", done => {
  const adapter = new TestAdapter(undefined)

  const handleConnect = jest.fn()
  const handleReconnecting = jest.fn()
  const handleDisconnect = jest.fn()
  const handleError = jest.fn()

  const handleMessage = (message: Message) => {
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
