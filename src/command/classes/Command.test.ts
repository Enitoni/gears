import { matchPrefixes } from "../matchers"
import { getMockContext } from "../mocks"
import { Command } from "./Command"

test("Command matches", async () => {
  const command = new Command({
    matcher: matchPrefixes("Hi"),
    action: () => {}
  })

  const context = getMockContext("Hi")
  const result = await command.getMatch(context)

  expect(result).toBeDefined()
  await result!.command.run(result!.context)
})

test("Command does not match", async () => {
  const command = new Command({
    matcher: matchPrefixes("Hi"),
    action: () => {}
  })

  const context = getMockContext("Bye")
  const result = await command.getMatch(context)

  expect(result).toBeUndefined()
})
