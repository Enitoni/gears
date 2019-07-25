import { IconType } from "../types/IconType"
import * as icons from "../icons"
import React from "react"

export interface IconProps {
  className?: string
  name: IconType
}

export function Icon(props: IconProps) {
  const { name, className } = props

  if (!icons[name]) return null

  return React.cloneElement(icons[name], {
    className,
    width: "100%",
    height: "100%"
  })
}
