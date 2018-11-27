import { Emitter } from "./Emitter"

interface Events {
  event: undefined
}

test("Emitter#emit", done => {
  const emitter = new Emitter<Events>()
  let value = 0

  emitter.emit("event", undefined)

  emitter.on("event", () => {
    value++

    expect(value).toBe(1)
    done()
  })

  emitter.emit("event", undefined)
})

test("Emitter#once", () => {
  const emitter = new Emitter<Events>()
  let value = 0

  const handler = () => value++

  emitter.once("event", handler)

  emitter.emit("event", undefined)
  emitter.emit("event", undefined)

  expect(value).toBe(1)
})

test("Emitter#off", () => {
  const emitter = new Emitter<Events>()
  let value = 0

  const handler = () => value++

  emitter.off("event", handler)
  emitter.on("event", handler)
  emitter.emit("event", undefined)
  emitter.off("event", handler)
  emitter.emit("event", undefined)

  expect(value).toBe(1)
})

test("Emitter#pipe", done => {
  const firstEmitter = new Emitter<Events>()
  const secondEmitter = new Emitter<Events>()

  secondEmitter.on("event", () => {
    done()
  })

  firstEmitter.pipe(
    "event",
    secondEmitter
  )
  firstEmitter.emit("event", undefined)
})

test("Emitter#getListenerCount", () => {
  const emitter = new Emitter<Events>()

  const noop = () => undefined
  const noopTwo = () => undefined

  expect(emitter.getListenerCount("event")).toBe(0)

  emitter.on("event", noop)
  emitter.on("event", noop)
  emitter.on("event", noopTwo)

  expect(emitter.getListenerCount("event")).toBe(2)

  emitter.off("event", noop)

  expect(emitter.getListenerCount("event")).toBe(1)
})

test("Emitter#hasListeners", () => {
  const emitter = new Emitter<Events>()

  const noop = () => undefined

  emitter.on("event", noop)
  emitter.on("event", noop)
  emitter.on("event", noop)

  expect(emitter.hasListeners("event")).toBe(true)

  emitter.off("event", noop)

  expect(emitter.hasListeners("event")).toBe(false)
})
