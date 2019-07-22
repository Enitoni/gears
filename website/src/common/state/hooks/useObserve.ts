import { useState, useEffect } from "react"
import { observe } from "mobx"

export const useObserve = <T extends object>(target: T, property: keyof T) => {
  const [value, setValue] = useState(target[property])

  useEffect(() => {
    return observe(target, property, change => {
      setValue(change.newValue)
    })
  })

  return value
}
