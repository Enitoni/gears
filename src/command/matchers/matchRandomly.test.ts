import { getMockContext } from "../mocks"
import { matchRandomly } from "./matchRandomly"

test("matchRandomly", async () => {
  const context = getMockContext("")

  const first = matchRandomly(1)(context)
  const second = matchRandomly(0)(context)
  await matchRandomly()(context)

  expect(first).toBeDefined()
  expect(second).toBeUndefined()
})
