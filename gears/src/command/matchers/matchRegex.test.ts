import { getMockContext } from "../mocks"
import { matchRegex } from "./matchRegex"

test("matchRegex", async () => {
  const context = getMockContext("Hi, how are you?")

  const first = await matchRegex(/[how]/g)(context)
  const second = await matchRegex(() => /[a-z]/g)(context)
  const third = await matchRegex(/[b]/g)(context)

  expect(first).toBeDefined()
  expect(second).toBeDefined()
  expect(third).toBeUndefined()
})
