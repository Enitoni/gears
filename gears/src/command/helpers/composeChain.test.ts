import { MockCommandGroup, MockCommand, getMockContext } from "../mocks"
import { matchPrefixes } from "../matchers"
import { composeChain } from "./composeChain"

test("composeChain", async () => {
  const input = "!abc"
  const output = "response"

  let calls = 0

  const command = new MockCommand({
    matcher: matchPrefixes("b"),
    middleware: [
      (context, next) => {
        expect(calls).toBe(1)
        calls++

        expect(context.content).toBe("c")
        expect(context.state.foo).toBe("foo")

        return next()
      },
      () => {
        return output
      }
    ]
  })

  const group = new MockCommandGroup({
    matcher: matchPrefixes("!a"),
    middleware: [
      (context, next) => {
        expect(context.content).toBe("bc")

        expect(calls).toBe(0)
        calls++

        context.state.foo = "foo"
        return next()
      }
    ],
    commands: [command]
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
