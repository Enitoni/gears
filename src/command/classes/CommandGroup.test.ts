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
    matcher: context => {
      if (context.content.startsWith("a")) {
        context.content = context.content[1]
        return context
      }
    },
    commands: [command]
  })

  expect(group.commands.length).toBe(1)

  const workingContext = getMockContext({
    content: "ab",
    user: "John Smith"
  })

  const failingContext = getMockContext({
    content: "ac",
    user: "Jane Smith"
  })

  const workingResult = await group.getMatch(workingContext)
  expect(workingResult).toBeDefined()

  if (workingResult) {
    expect(workingResult.command).toBe(command)
  }

  const failingResult = await group.getMatch(failingContext)
  expect(failingResult).toBeUndefined()
})
