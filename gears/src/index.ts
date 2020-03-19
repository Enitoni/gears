import * as bot from "./bot"
import * as service from "./service"
import * as command from "./command"

export * from "./command/matchers"

export const core = {
  ...bot,
  ...service,
  ...command,
}
