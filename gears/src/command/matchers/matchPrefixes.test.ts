import { getMockContext } from "../mocks"
import { matchPrefixes } from "./matchPrefixes"

test("matchPrefixes", async () => {
  const match = matchPrefixes("hi")

  const workingContext = await match(getMockContext("hi how are you"))
  const failingContext = await match(getMockContext("no"))

  expect(workingContext).toBeDefined()

  if (workingContext) {
    expect(workingContext.content).toBe("how are you")
  }

  expect(failingContext).toBeUndefined()
})
