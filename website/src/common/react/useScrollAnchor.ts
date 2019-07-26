import { useEffect, useRef } from "react"
import { useStores } from "../state/hooks/useStores"
import { useObserver } from "mobx-react-lite"

import scrollIntoView from "scroll-into-view"
import { getScrollableParent } from "../lang/dom/getScrollableParent"

import css from "@emotion/css"
import { Theme } from "../../modules/theming/types/Theme"
import { transparentize, cover } from "polished"
import { keyframes } from "@emotion/core"

export const SCROLL_DURATION = 250
export const HIGHLIGHT_PADDING = "8px"

const fade = (theme: Theme) => keyframes`
  0% {
    background: ${transparentize(0.8, theme.stateColors.warning)};
  }

  100% {
    background: ${transparentize(1, theme.stateColors.warning)};
  }
`

export const highlightedScrollAnchor = (theme: Theme) => css`
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    display: block;

    ${cover(-8)}
    z-index: -1;

    border-radius: 4px;

    animation-name: ${fade(theme)}, ${fade(theme)};
    animation-duration: 250ms, 1s;
    animation-direction: reverse, normal;
    animation-fill-mode: forwards, forwards;
    animation-timing-function: ease;
    animation-delay: 0ms, ${SCROLL_DURATION + 1250}ms;
  }
`

export type Alignment = "center" | "end"

const alignmentMap: Record<Alignment, __ScrollIntoView.Alignment> = {
  center: {
    left: 0.5,
    top: 0.5
  },
  end: {
    left: 0.5,
    top: 1
  }
}

export const useScrollAnchor = (path: string, align: Alignment = "end") => {
  const { routingStore } = useStores()

  const ref = useRef<any>(null)
  const pathRef = useRef("")

  const { hash, pathname } = useObserver(() => {
    const { location } = routingStore
    const { hash, pathname } = location

    return { hash, pathname }
  })

  const isHash = path.startsWith("#")
  const safePath = isHash ? hash : pathname
  const active = path === safePath

  useEffect(() => {
    const { current: element } = ref
    const { current: previousPath } = pathRef
    if (!element) return

    const id = element.getAttribute("id")

    if (!id) throw new Error("Can't useScrollAnchor on a tag without id")

    if (active && safePath !== previousPath) {
      scrollIntoView(element, {
        time: SCROLL_DURATION,
        align: alignmentMap[align],
        validTarget: (target, scrolled) => {
          const parent = getScrollableParent(element)
          const safeParent = parent === document.body ? window : parent

          return safeParent === target && scrolled < 2
        }
      })
    }

    pathRef.current = safePath
  }, [hash, active, safePath, path, align])

  return [ref, active] as const
}
