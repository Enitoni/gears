import { matchPrefixes } from "../../command/matchers"
import { MockCommand, MockCommandGroup } from "../../command/mocks"
import { getMockBot, MockClient } from "../mocks"

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
    matcher: matchPrefixes("AB"),
    commands: [command, errorCommand]
  })

  const handleError = jest.fn()

  const handleResponse = jest.fn(response => {
    expect(response).toBe("Response!")
  })

  const handleCommand = jest.fn(([command, message]) => {
    expect(command).toBe(command)
    expect(message).toBe("ABC")
  })

  const bot = getMockBot({ commands: [group] })

  bot.on("response", handleResponse)
  bot.once("command", handleCommand)

  expect(bot.client).toBeInstanceOf(MockClient)

  /**
   * Check that the bot throws if no error handler on the emitter is set
   * The MockAdapter will always throw on start
   */
  await expect(bot.start()).rejects.toThrow()
  bot.on("error", handleError)

  /**
   * Process a message that will match
   */
  await bot.processMessage("ABC")

  expect(action).toBeCalledTimes(1)
  expect(handleResponse).toBeCalled()

  /**
   * Process a message that will trigger the error command
   */
  await bot.processMessage("ABCD")

  /**
   * Process a message that will not match
   */
  await bot.processMessage("CDE")

  expect(errorAction).toBeCalled()
})
