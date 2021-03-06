import { AdapterHooks, ClientAdapter } from "../classes"
import { MockClient, MockClientMessage } from "./MockClient"

export class MockAdapter extends ClientAdapter<MockClientMessage, MockClient, undefined> {
  protected register(_: undefined, hooks: AdapterHooks<MockClientMessage>) {
    const client = new MockClient()

    client.on("message", hooks.message)
    client.on("ready", hooks.ready)
    client.on("unready", hooks.unready)
    client.on("error", hooks.error)

    return {
      client,
      methods: {
        start: () => client.start(),
        getMessageContent: (message: MockClientMessage) => message,
      },
    }
  }
}
