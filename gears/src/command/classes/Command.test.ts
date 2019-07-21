import { MockClient, MockClientMessage } from "../../bot/mocks"
import { composeMiddleware } from "../helpers"
import { matchPrefixes } from "../matchers"
import { getMockContext } from "../mocks"
import { Middleware as CoreMiddleware } from "../types"
import { Command } from "./Command"

export interface Middleware<D> extends CoreMiddleware<D, MockClientMessage, MockClient> {}

test("Command matches", async () => {
  const command = new Command({
    matcher: matchPrefixes("Hi"),
    middleware: () => {}
  })

  const context = getMockContext("Hi")
  const chain = await command.getChain(context)

  expect(chain).toBeDefined()
})

test("Command does not match", async () => {
  const command = new Command({
    matcher: matchPrefixes("Hi"),
    middleware: () => {}
  })

  const context = getMockContext("Bye")
  const result = await command.getChain(context)

  expect(result).toBeUndefined()
})

test("Command has middleware", async () => {
  const middlewareA: Middleware<{ a: number }> = context => {
    context.state.a = 3
  }

  const middlewareB: Middleware<{ b: number }> = context => {
    context.state.b = 5
  }

  const command = new Command<MockClientMessage, MockClient>({
    matcher: matchPrefixes("fuuuuuck"),
    middleware: [middlewareA, middlewareB, context => {}]
  })

  const run = composeMiddleware(command.middleware)
  run(getMockContext("g"))
})
