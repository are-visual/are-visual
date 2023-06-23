import { useCallback, useEffect, useRef, useState } from 'react'

interface UseHoverShowParams {
  display: 'hover' | 'always' | 'scroll'
}

function useHoverShow(params: UseHoverShowParams) {
  const { display } = params
  const isLeave = useRef(true)
  const timer = useRef<number>()

  const [hoverShow, setHoverShow] = useState(false)

  const delay = useCallback(() => {
    clearTimeout(timer.current)
  }, [])

  const hidden = useCallback(() => {
    if (display === 'hover' && isLeave.current) {
      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setHoverShow(false)
      }, 300)
    }
  }, [display])

  const onMouseEnter = () => {
    clearTimeout(timer.current)
    isLeave.current = false
    setHoverShow(true)
  }
  const onMouseOut = () => {
    isLeave.current = true
  }
  const onMouseLeave = () => {
    if (display === 'hover') {
      timer.current = window.setTimeout(() => {
        setHoverShow(false)
      }, 300)
    }
  }

  useEffect(() => {
    if (display !== 'hover') return

    const controller = new AbortController()

    let isPressed = false
    document.addEventListener(
      'mousedown',
      () => {
        isPressed = true
      },
      {
        signal: controller.signal,
      },
    )
    document.addEventListener(
      'mouseout',
      (e) => {
        if (e.relatedTarget) return
        hidden()
      },
      {
        signal: controller.signal,
      },
    )
    document.addEventListener(
      'mousemove',
      () => {
        if (isPressed) {
          delay()
        }
      },
      {
        signal: controller.signal,
      },
    )
    document.addEventListener(
      'mouseup',
      () => {
        isPressed = false
        hidden()
      },
      {
        signal: controller.signal,
      },
    )
    return () => controller.abort()
  }, [delay, display, hidden])

  return { hoverShow, onMouseEnter, onMouseOut, onMouseLeave }
}

export default useHoverShow
