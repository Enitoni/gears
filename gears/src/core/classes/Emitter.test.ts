import { Emitter } from "./Emitter"

interface Events {
  event: any
}

describe("Emitter", () => {
  it("emit", done => {
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

  it("once", () => {
    const emitter = new Emitter<Events>()
    let value = 0

    const handler = () => value++

    emitter.once("event", handler)

    emitter.emit("event", undefined)
    emitter.emit("event", undefined)

    expect(value).toBe(1)
  })

  it("off", () => {
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

  it("pipe", done => {
    const firstEmitter = new Emitter<Events>()
    const secondEmitter = new Emitter<Events>()

    secondEmitter.on("event", () => {
      done()
    })

    firstEmitter.pipe(
      "event",
      secondEmitter,
    )
    firstEmitter.emit("event", undefined)
  })

  test("getListenerCount", () => {
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

  it("hasListeners", () => {
    const emitter = new Emitter<Events>()

    const noop = () => undefined

    emitter.on("event", noop)
    emitter.on("event", noop)
    emitter.on("event", noop)

    expect(emitter.hasListeners("event")).toBe(true)

    emitter.off("event", noop)

    expect(emitter.hasListeners("event")).toBe(false)
  })

  it("waitFor", async () => {
    const emitter = new Emitter<Events>()
    const promise = emitter.waitFor("event")

    emitter.emit("event", "H")

    const value = await promise
    expect(value).toBe("H")
  })
})
