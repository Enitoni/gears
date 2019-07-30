import { matchAlways } from "../matchers"
import { CommandGroupBuilder } from "./CommandGroupBuilder"
import { CommandGroup } from "./CommandGroup"
import { CommandBuilder } from "./CommandBuilder"

const command = new CommandBuilder<string, {}>()
  .match(matchAlways())
  .use(() => {})
  .done()

test("CommandGroupBuilder", () => {
  let builder = new CommandGroupBuilder<string, {}>()

  builder = builder.setMetadata({
    name: "Test",
    description: "This is a description",
  })

  expect(() => builder.done()).toThrow()

  builder = builder.match(matchAlways())
  expect(() => builder.match(matchAlways())).toThrow()
  expect(() => builder.done()).toThrow()

  builder = builder.use((_, next) => {
    return next()
  })

  expect(() => builder.done()).toThrow()

  builder = builder.setCommands(command)

  const group = builder.done()

  expect(group).toBeInstanceOf(CommandGroup)
  expect(group.metadata).toMatchObject({
    name: "Test",
    description: "This is a description",
  })
})
