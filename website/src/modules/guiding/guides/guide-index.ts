import { Guide } from "../types/Guide"
import { installation } from "./installation"
import { understandingGears } from "./understanding-gears"
import { creatingBot } from "./creating-bot"
import { addingCommands } from "./adding-commands"
import { usingMiddleware } from "./using-middleware"
import { addingGroups } from "./adding-groups"

export const guides: Guide[] = [
  installation,
  understandingGears,
  creatingBot,
  addingCommands,
  usingMiddleware,
  addingGroups,
]
