import { Emitter } from "../../core/classes"
import { AdapterEvents } from "../classes"

export interface MockClientMessage {
  content: string
  user: string
}

export class MockClient extends Emitter<AdapterEvents<MockClientMessage>> {
  public async start() {
    this.emit("connect", undefined)
    this.emit("reconnecting", undefined)
    this.emit("disconnect", undefined)
    this.emit("error", new Error("Failed to reconnect"))
    this.emit("message", {
      content: "Hello",
      user: "John Smith"
    })
  }
}
