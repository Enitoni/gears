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
  protected emit<E extends keyof Events>(type: E, data: Events[E]) {
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
}
