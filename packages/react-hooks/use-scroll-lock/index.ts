import { getScrollbarWidth } from '@are-visual/utils'
import { RefObject, useCallback } from 'react'

interface StyleSnap {
  overflow: string
  paddingRight: string
}

const getPaddingRight = (element: Element): number => {
  const owner = element?.ownerDocument || document
  const view = owner.defaultView || window
  return Number.parseInt(view.getComputedStyle(element).paddingRight, 10) || 0
}

const styleSnap = new Map<HTMLElement, StyleSnap>()

export const ARE_VISUAL_SCROLL_WIDTH_CSS_VAR = '--are-scroll-width'

/**
 * ```ts
 * const lock = useScrollLock() // 默认为 document.body
 * const lock = useScrollLock(document.getElementById('#root'))
 * lock(true)
 * lock(false)
 * ```
 */
function useScrollLock(element?: RefObject<HTMLElement>) {
  const lock = useCallback(
    (value: boolean) => {
      const el = element?.current || document.body
      if (!el) return
      if (value) {
        if (styleSnap.has(el)) return
        const paddingRight = getPaddingRight(el)
        const scrollbarWidth = getScrollbarWidth(el)
        styleSnap.set(el, {
          overflow: el.style.overflow,
          paddingRight: el.style.paddingRight,
        })
        el.style.setProperty('overflow', 'hidden')
        el.style.setProperty(
          'padding-right',
          `${paddingRight + scrollbarWidth}px`,
        )
        el.style.setProperty(
          ARE_VISUAL_SCROLL_WIDTH_CSS_VAR,
          `${scrollbarWidth}px`,
        )
      } else {
        const target = styleSnap.get(el)
        if (!target) return
        el.style.setProperty('overflow', target.overflow)
        el.style.setProperty('padding-right', target.paddingRight)
        el.style.removeProperty(ARE_VISUAL_SCROLL_WIDTH_CSS_VAR)
        styleSnap.delete(el)
      }
    },
    [element],
  )

  return lock
}

export default useScrollLock
