import { getMockContext } from "../mocks"
import { matchRandomly } from "./matchRandomly"

test("matchRandomly", async () => {
  const context = getMockContext("")

  const first = await matchRandomly(1)(context)
  const second = await matchRandomly(0)(context)
  await matchRandomly()(context)

  expect(first).toBeDefined()
  expect(second).toBeUndefined()
})
