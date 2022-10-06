import { getScrollbarWidth } from '@are-visual/utils'
import { RefObject, useCallback, useRef } from 'react'

interface StyleSnap {
  overflow: string
  paddingRight: string
}

const getPaddingRight = (element: Element): number => {
  const owner = element?.ownerDocument || document
  const view = owner.defaultView || window
  return Number.parseInt(view.getComputedStyle(element).paddingRight, 10) || 0
}

/**
 * ```ts
 * const lock = useScrollLock() // 默认为 document.body
 * const lock = useScrollLock(document.getElementById('#root'))
 * lock(true)
 * lock(false)
 * ```
 */
function useScrollLock(element?: RefObject<HTMLElement>) {
  const styleSnap = useRef<StyleSnap>()

  const lock = useCallback(
    (value: boolean) => {
      const el = element?.current || document.body
      if (!el) return
      if (value) {
        const paddingRight = getPaddingRight(el)
        const scrollbarWidth = getScrollbarWidth(el)
        styleSnap.current = {
          overflow: el.style.overflow,
          paddingRight: el.style.paddingRight,
        }
        el.style.setProperty('overflow', 'hidden')
        el.style.setProperty(
          'padding-right',
          `${paddingRight + scrollbarWidth}px`,
        )
      } else {
        if (!styleSnap.current) return
        el.style.setProperty('overflow', styleSnap.current.overflow)
        el.style.setProperty('padding-right', styleSnap.current.paddingRight)
      }
    },
    [element],
  )

  return lock
}

export default useScrollLock
