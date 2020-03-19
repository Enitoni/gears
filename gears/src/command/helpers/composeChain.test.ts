import { MockCommandGroup, MockCommand, getMockContext } from "../mocks"
import { matchPrefixes } from "../matchers"
import { composeChain } from "./composeChain"

test("composeChain", async () => {
  const input = "!abc"
  const output = "response"

  let calls = 0

  const command = new MockCommand()
    .match(matchPrefixes("b"))
    .use<{ foo: string }>((context, next) => {
      expect(calls).toBe(1)
      calls++

      expect(context.content).toBe("c")
      expect(context.state.foo).toBe("foo")

      return next()
    })
    .use(() => {
      return output
    })

  const group = new MockCommandGroup()
    .match(matchPrefixes("!a"))
    .setCommands(command)
    .use<{ foo: string }>((context, next) => {
      expect(context.content).toBe("bc")

      expect(calls).toBe(0)
      calls++

      context.state.foo = "foo"
      return next()
    })

  const context = getMockContext(input)
  const chain = await group.getChain(context)

  expect(chain).toBeDefined()

  if (chain) {
    const run = composeChain(chain)
    const response = await run()

    expect(response).toBe(output)
  }
})
