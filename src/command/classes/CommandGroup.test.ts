import { matchPrefixes } from "../matchers"
import { MockCommand, MockCommandGroup } from "../mocks"
import { getMockContext } from "../mocks/getMockContext"

test("CommandGroup", async () => {
  const action = jest.fn()

  const command = new MockCommand({
    matcher: context => {
      if (context.content === "b") return context
    },
    action
  })

  const group = new MockCommandGroup({
    matcher: matchPrefixes("a"),
    commands: [command]
  })

  expect(group.commands.length).toBe(1)

  const workingContext = getMockContext("ab")
  const failingContext = getMockContext("ac")

  const workingResult = await group.getMatch(workingContext)
  expect(workingResult).toBeDefined()

  if (workingResult) {
    expect(workingResult.command).toBe(command)
  }

  const failingResult = await group.getMatch(failingContext)
  expect(failingResult).toBeUndefined()
})
