import { Bot } from "../classes"
import { MockAdapter } from "./MockAdapter"
import { CommandLike } from "../../command"
import { MockClient } from "./MockClient"

export interface MockBotOptions {
  commands: CommandLike<string, MockClient>[]
}

const defaultOptions = {
  commands: []
}

export const getMockBot = (options?: MockBotOptions) => {
  const adapter = new MockAdapter(undefined)
  const { commands } = options || defaultOptions

  return new Bot({ adapter, commands })
}
