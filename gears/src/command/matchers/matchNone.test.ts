import { getMockContext } from "../mocks"
import { matchNone } from "./matchNone"
import { matchPrefixes } from "./matchPrefixes"

test("matchNone", async () => {
  const context = getMockContext("A")

  const first = await matchNone(matchPrefixes("B"))(context)
  const second = await matchNone(matchPrefixes("A"))(context)

  expect(first).toBeDefined()
  expect(second).toBeUndefined()
})
