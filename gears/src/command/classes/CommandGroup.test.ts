import { matchPrefixes } from "../matchers"
import { MockCommand, MockCommandGroup } from "../mocks"
import { getMockContext } from "../mocks/getMockContext"

test("CommandGroup", async () => {
  const action = jest.fn()

  const command = new MockCommand()
    .match(context => (context.content === "b" ? context : undefined))
    .use(action)

  const group = new MockCommandGroup().match(matchPrefixes("a")).setCommands(command)

  expect(group.commands.length).toBe(1)

  const context = getMockContext("ab")
  const failingContext = getMockContext("ac")

  const chain = await group.getChain(context)
  expect(chain).toBeDefined()

  const failingChain = await group.getChain(failingContext)
  expect(failingChain).toBeUndefined()
})
