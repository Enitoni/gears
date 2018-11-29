import { Emitter } from "../../core/classes"
import { AdapterEvents } from "../classes"

export type MockClientMessage = string

export class MockClient extends Emitter<AdapterEvents<MockClientMessage>> {
  public async start() {
    this.emit("ready", undefined)
    this.emit("unready", undefined)
    this.emit("error", new Error("Failed to reconnect"))
    this.emit("message", "Hello")
  }
}
