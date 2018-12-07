import { xor } from "./xor"

test("xor", () => {
  const no = xor(true, true)
  const yes = xor(true, false)
  const nope = xor(false, false)

  expect(no).toBe(false)
  expect(yes).toBe(true)
  expect(nope).toBe(false)
})
