import { CommandBuilder } from "./CommandBuilder"
import { Command } from "./Command"
import { matchAlways } from "../matchers"

test("CommandBuilder", () => {
  let builder = new CommandBuilder<string, {}>()

  builder = builder.setMetadata({
    name: "Test",
    description: "This is a description"
  })

  expect(() => builder.done()).toThrow()

  builder = builder.match(matchAlways())
  expect(() => builder.match(matchAlways())).toThrow()
  expect(() => builder.done()).toThrow()

  builder = builder.use((_, next) => {
    return next()
  })

  const command = builder.done()

  expect(command).toBeInstanceOf(Command)
  expect(command.metadata).toMatchObject({
    name: "Test",
    description: "This is a description"
  })
})
