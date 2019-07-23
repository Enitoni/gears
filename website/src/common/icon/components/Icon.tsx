import { IconType } from "../types/IconType"
import * as icons from "../icons"
import React from "react"

export interface IconProps {
  name: IconType
}

export function Icon(props: IconProps) {
  const { name } = props

  return React.cloneElement(icons[name], {
    width: "100%",
    height: "100%"
  })
}
