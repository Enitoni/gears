type EventHandler<T> = (value: T) => void

interface EventListener<T = any> {
  handler: EventHandler<T>
  once: boolean
}

/**
 * A typesafe EventEmitter
 * @category Internal
 */
export class Emitter<Events extends object> {
  private listeners = new Map<keyof Events, EventListener[]>()

  private addListener<E extends keyof Events>(type: E, listener: EventListener) {
    const listeners = (this.listeners.get(type) || []).filter(
      l => l.handler !== listener.handler
    )

    this.listeners.set(type, [...listeners, listener])
  }

  public emit = <E extends keyof Events>(type: E, data: Events[E]) => {
    const listeners = this.listeners.get(type)
    if (!listeners) return

    const newHandlers = []

    for (const listener of listeners) {
      listener.handler(data)
      if (!listener.once) newHandlers.push(listener)
    }

    this.listeners.set(type, newHandlers)
  }

  public on = <E extends keyof Events>(type: E, handler: EventHandler<Events[E]>) => {
    this.addListener(type, { handler, once: false })
  }

  public once = <E extends keyof Events>(type: E, handler: EventHandler<Events[E]>) => {
    this.addListener(type, { handler, once: true })
  }

  public off = <E extends keyof Events>(type: E, handler: EventHandler<Events[E]>) => {
    const listeners = (this.listeners.get(type) || []).filter(
      listener => listener.handler !== handler
    )

    this.listeners.set(type, listeners)
  }

  public getListenerCount = <E extends keyof Events>(type: E) => {
    return (this.listeners.get(type) || []).length
  }

  public hasListeners = <E extends keyof Events>(type: E) => {
    return this.getListenerCount(type) > 0
  }

  public pipe = <E extends keyof Events, T extends Emitter<Events>>(
    type: E,
    emitter: T
  ) => {
    this.on(type, (value: Events[E]) => emitter.emit(type, value))
  }

  public waitFor = <E extends keyof Events>(type: E) => {
    return new Promise<Events[E]>(resolve => {
      this.once(type, value => {
        resolve(value)
      })
    })
  }
}
