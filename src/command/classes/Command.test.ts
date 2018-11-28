import { CommandMatcher, Context } from "../types"
import { Command } from "./Command"

const TEST_STRING = "Test!"

type TestContext = Context<
  {
    test: string
    bot: any
  },
  string
>

const matchTrue: CommandMatcher<TestContext> = context => {
  context.test = TEST_STRING
  return context
}

const matchFalse: CommandMatcher<TestContext> = () => {
  return
}

const getTestCommand = (matcher: CommandMatcher<TestContext>) =>
  new Command({
    matcher,
    action: context => {
      expect(context.test).toBe(TEST_STRING)
    }
  })

// @ts-ignore: There is no mock bot right now
const getContext = (): TestContext => ({
  message: "Hey!",
  content: "Hey!",
  test: TEST_STRING,
  bot: undefined
})

test("Command matches", async () => {
  const command = getTestCommand(matchTrue)
  const context = getContext()
  const result = await command.getMatch(context)

  expect(result).toBeDefined()
  await result!.command.run(result!.context)
})

test("Command does not match", async () => {
  const command = getTestCommand(matchFalse)
  const context = getContext()
  const result = await command.getMatch(context)

  expect(result).toBeUndefined()
})
