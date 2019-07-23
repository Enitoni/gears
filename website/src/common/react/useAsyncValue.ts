import { useState, useRef } from "react"
import { useIsomorphicEffect } from "./useIsomorphicEffect"

export interface AsyncValueResult<T> {
  value?: T
  done: boolean
  error?: any
}

export const useAsyncValue = <T>(getPromise: () => Promise<T>, deps: any[] = []) => {
  const unmountedRef = useRef(false)
  const [result, setResult] = useState<AsyncValueResult<T>>({ done: false })

  const safelySetResult = (result: AsyncValueResult<T>) => {
    if (unmountedRef.current) return null

    setResult(result)
  }

  useIsomorphicEffect(() => {
    unmountedRef.current = false
    safelySetResult({ value: result.value, done: false })

    async function performAwait() {
      try {
        const value = await getPromise()

        safelySetResult({ value, done: true })
      } catch (error) {
        safelySetResult({ error, done: true })
      }
    }

    performAwait()

    return () => {
      unmountedRef.current = true
    }
  }, [...deps])

  return result
}