import { bind } from "decko"

type EventHandler<T> = (value: T) => void

interface EventListener<T = any> {
  handler: EventHandler<T>
  once: boolean
}

export class Emitter<Events extends object> {
  private listeners = new Map<keyof Events, EventListener[]>()

  private addListener<E extends keyof Events>(type: E, listener: EventListener) {
    const listeners = this.listeners.get(type) || []
    this.listeners.set(type, [...listeners, listener])
  }

  @bind
  public emit<E extends keyof Events>(type: E, data: Events[E]) {
    const listeners = this.listeners.get(type)
    if (!listeners) return

    const newHandlers = []

    for (const listener of listeners) {
      listener.handler(data)
      if (!listener.once) newHandlers.push(listener)
    }

    this.listeners.set(type, newHandlers)
  }

  @bind
  public on<E extends keyof Events>(type: E, handler: EventHandler<Events[E]>) {
    this.addListener(type, { handler, once: false })
  }

  @bind
  public once<E extends keyof Events>(type: E, handler: EventHandler<Events[E]>) {
    this.addListener(type, { handler, once: true })
  }

  @bind
  public off<E extends keyof Events>(type: E, handler: EventHandler<Events[E]>) {
    const listeners = (this.listeners.get(type) || []).filter(
      listener => listener.handler !== handler
    )

    this.listeners.set(type, listeners)
  }

  @bind
  public getListenerCount<E extends keyof Events>(type: E) {
    return (this.listeners.get(type) || []).length
  }

  @bind
  public hasListeners<E extends keyof Events>(type: E) {
    return this.getListenerCount(type) > 0
  }

  @bind
  public pipe<E extends keyof Events, T extends Emitter<Events>>(type: E, emitter: T) {
    this.on(type, (value: Events[E]) => emitter.emit(type, value))
  }
}
