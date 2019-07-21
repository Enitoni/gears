import { composeMiddleware } from "../helpers"
import { getMockContext } from "../mocks"
import { Middleware } from "../types"

const context = getMockContext("Hi!")

test("response", async () => {
  const fn = jest.fn()

  const chain: Middleware[] = [
    async (_, next) => {
      const response = await next()
      expect(response).toBe("Hello!")

      return "Greetings!"
    },
    async (_, next) => {
      return next()
    },
    async () => {
      return "Hello!"
    },
    async () => {
      fn()
    }
  ]

  const run = composeMiddleware(chain)
  const response = await run(context)

  expect(response).toBe("Greetings!")
  expect(fn).not.toHaveBeenCalled()
})

test("error", async () => {
  const chain: Middleware[] = [
    async (_, next) => {
      try {
        await next()
      } catch (error) {
        expect(error).toBe("Stop it!")
        return "Error!"
      }
    },
    async () => {
      throw "Stop it!"
    }
  ]

  const run = composeMiddleware(chain)
  const response = await run(context)

  expect(response).toBe("Error!")
})

test("no response", async () => {
  const chain: Middleware[] = []

  const run = composeMiddleware(chain)
  const response = await run(context)

  expect(response).toBeUndefined()
})
