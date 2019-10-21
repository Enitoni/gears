import { Guide } from "../types/Guide"
import { installation } from "./installation"
import { understandingGears } from "./understanding-gears"
import { creatingBot } from "./creating-bot"
import { addingCommands } from "./adding-commands"
import { usingMiddleware } from "./using-middleware"
import { addingGroups } from "./adding-groups"
import { services } from "./services"
import { creatingService } from "./creating-service"
import { usingService } from "./using-service"

export const guides: Guide[] = [
  installation,
  understandingGears,
  creatingBot,
  addingCommands,
  usingMiddleware,
  addingGroups,
  services,
  creatingService,
  usingService,
]
