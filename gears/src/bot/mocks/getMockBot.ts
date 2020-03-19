import { Bot } from "../classes"
import { MockAdapter } from "./MockAdapter"
import { MockClient } from "./MockClient"
import { CommandLike } from "../../command/types/CommandLike"

export interface MockBotOptions {
  commands: CommandLike<string, MockClient>[]
}

const defaultOptions = {
  commands: [],
}

export const getMockBot = (options?: MockBotOptions) => {
  const adapter = new MockAdapter(undefined)
  const { commands } = options || defaultOptions

  return new Bot({ adapter, commands })
}
