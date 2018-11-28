import { AdapterHooks, ClientAdapter } from "../classes"
import { MockClient, MockClientMessage } from "./MockClient"

export class MockAdapter extends ClientAdapter<MockClient, undefined, MockClientMessage> {
  protected register(options: undefined, hooks: AdapterHooks<MockClientMessage>) {
    const client = new MockClient()

    client.on("message", hooks.message)
    client.on("connect", hooks.connect)
    client.on("reconnecting", hooks.reconnecting)
    client.on("disconnect", hooks.disconnect)
    client.on("error", hooks.error)

    return {
      client,
      methods: {
        start: () => client.start(),
        getMessageContent: (message: MockClientMessage) => message.content
      }
    }
  }
}
