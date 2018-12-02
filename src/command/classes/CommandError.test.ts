import { matchAlways } from "../matchers"
import { getMockContext } from "../mocks"
import { MatchResult } from "../types"
import { Command } from "./Command"
import { CommandError } from "./CommandError"

test("CommandError", () => {
  const context = getMockContext("Blah")
  const command = new Command({ matcher: matchAlways(), action: () => {} })
  const result: MatchResult<any, any> = { context, command }

  const error = new CommandError(result, "I'm gay!")

  expect(error.toString()).toBe("CommandError: I'm gay!")
  expect(error.match).toBe(result)
})
