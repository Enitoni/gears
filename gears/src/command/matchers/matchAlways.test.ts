import { getMockContext } from "../mocks"
import { matchAlways } from "./matchAlways"

test("matchAlways", () => {
  const result = matchAlways()(getMockContext(""))
  expect(result).toBeDefined()
})
