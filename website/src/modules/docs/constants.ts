import { IconType } from "../../common/icon/types/IconType"
import { DescriptorKind } from "./types/Descriptor"

export const kindToIconMap: Record<DescriptorKind, IconType> = {
  Class: "encapsulated",
  Interface: "typeAlias",
  Method: "doubleParens",
  Property: "circledP",
  Function: "doubleParens",
  Parameter: "placeholder",
  Constructor: "doubleParens",
  "Type alias": "typeAlias",
  "Type parameter": "generic",
  "Call signature": "doubleParens",
  "Constructor signature": "doubleParens"
}
