import { MockCommandGroup, MockCommandGroupInstance } from "../../command/mocks"
import { Bot } from "../classes"
import { MockAdapter } from "./MockAdapter"

export interface MockBotOptions {
  group: MockCommandGroupInstance
}

const defaultOptions = {
  group: new MockCommandGroup({
    matcher: () => {},
    commands: []
  })
}

export const getMockBot = (options?: MockBotOptions) => {
  const adapter = new MockAdapter(undefined)
  const { group } = options || defaultOptions

  return new Bot({ adapter, group })
}
