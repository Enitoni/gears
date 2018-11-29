import { getMockContext } from "../mocks"
import { matchAll } from "./matchAll"
import { matchPrefixes } from "./matchPrefixes"

test("matchAll", async () => {
  const context = getMockContext("ABC AB")

  const first = await matchAll(matchPrefixes("ABC"), matchPrefixes("AB"))(context)
  const second = await matchAll(matchPrefixes("A"), matchPrefixes("CDE"))(context)

  expect(first).toBeDefined()
  expect(second).toBeUndefined()
})
