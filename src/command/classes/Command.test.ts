import { matchPrefixes } from "../matchers"
import { getMockContext } from "../mocks"
import { Command } from "./Command"

test("Command matches", async () => {
  const command = new Command({
    matcher: matchPrefixes("Hi"),
    middleware: () => {}
  })

  const context = getMockContext("Hi")
  const chain = await command.getChain(context)

  expect(chain).toBeDefined()
})

test("Command does not match", async () => {
  const command = new Command({
    matcher: matchPrefixes("Hi"),
    middleware: () => {}
  })

  const context = getMockContext("Bye")
  const result = await command.getChain(context)

  expect(result).toBeUndefined()
})
