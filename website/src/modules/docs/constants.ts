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
  "Type alias": "squaredT",
  "Type parameter": "generic",
  "Call signature": "doubleParens",
  "Constructor signature": "doubleParens"
}

const GLOBAL_OBJECTS =
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"

const BASIC_TYPES = "https://www.typescriptlang.org/docs/handbook/basic-types.html"

export const nameToURL: Record<string, string> = {
  Promise: GLOBAL_OBJECTS + "/Promise",
  number: GLOBAL_OBJECTS + "/Number",
  symbol: GLOBAL_OBJECTS + "/Symbol",
  string: GLOBAL_OBJECTS + "/String",
  boolean: GLOBAL_OBJECTS + "/Boolean",
  array: GLOBAL_OBJECTS + "/Array",
  object: GLOBAL_OBJECTS + "/Object",
  undefined: GLOBAL_OBJECTS + "/Undefined",
  null: GLOBAL_OBJECTS + "/Null",
  any: BASIC_TYPES + "#any",
  void: BASIC_TYPES + "#void",
  tuple: BASIC_TYPES + "#tuple"
}
