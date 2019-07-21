import { getMockContext } from "../mocks"
import { matchAlways } from "./matchAlways"
import { matchAny } from "./matchAny"
import { matchNone } from "./matchNone"
import { matchPrefixes } from "./matchPrefixes"

test("matchAny", async () => {
  const context = getMockContext("A")

  const first = await matchAny(matchPrefixes("A"), matchNone(matchAlways()))(context)
  const second = await matchAny(matchPrefixes("B"))(context)

  expect(first).toBeDefined()
  expect(second).toBeUndefined()
})
