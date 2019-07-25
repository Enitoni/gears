import { ModuleKind } from "./types/ModuleDescriptor"
import { IconType } from "../../common/icon/types/IconType"

export const kindToIconMap: Record<ModuleKind, IconType> = {
  Class: "encapsulated",
  Function: "doubleParens",
  Interface: "typeAlias",
  "Type alias": "typeAlias"
}
