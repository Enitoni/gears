import { MockCommand, MockCommandGroup, MockContext } from "../../command/mocks"
import { MatchResult } from "../../command/types"
import { getMockBot } from "../mocks"

test("Bot", async () => {
  const action = jest.fn(() => {
    return "Response!"
  })

  const errorAction = jest.fn(() => {
    throw new Error("Error!")
  })

  const command = new MockCommand({
    matcher: context => (context.content === "C" ? context : undefined),
    action
  })

  const errorCommand = new MockCommand({
    matcher: context => {
      return context
    },
    action: errorAction
  })

  const group = new MockCommandGroup({
    matcher: context => {
      if (context.content.startsWith("AB")) {
        context.content = context.content.replace("AB", "")
        return context
      }
    },
    commands: [command, errorCommand]
  })

  const handleError = jest.fn()

  const handleMatch = jest.fn((match: MatchResult<MockContext>) => {
    expect(match.command).toBeInstanceOf(MockCommand)
  })

  const handleResponse = jest.fn(response => {
    expect(response).toBe("Response!")
  })

  const bot = getMockBot({ group })

  bot.on("match", handleMatch)
  bot.on("response", handleResponse)

  /**
   * Check that the bot throws if no error handler on the emitter is set
   * The MockAdapter will always throw on start
   */
  await expect(bot.start()).rejects.toThrow()
  bot.on("error", handleError)

  /**
   * Process a message that will match
   */
  await bot.processMessage({
    content: "ABC",
    user: "John Smith"
  })

  expect(action).toBeCalledTimes(1)
  expect(handleMatch).toBeCalled()
  expect(handleResponse).toBeCalled()

  /**
   * Process a message that will trigger the error command
   */
  await bot.processMessage({
    content: "ABCD",
    user: "Jane Smith"
  })

  /**
   * Process a message that will not match
   */
  await bot.processMessage({
    content: "CDE",
    user: "Nobody"
  })

  expect(errorAction).toBeCalled()
  expect(handleError).toBeCalledTimes(1)
})
