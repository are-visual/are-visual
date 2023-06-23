/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './index.scss'

import cx from 'clsx'
import { composeRef } from 'rc-util/es/ref'
import React, {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import useHoverShow from './useHoverShow'

export interface ScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  containerRef?: ForwardedRef<HTMLDivElement>
  enabled?: 'x' | 'y' | boolean
  display?: 'hover' | 'always'
  styles?: {
    x?: {
      track?: {
        className?: string
        style?: CSSProperties
      }
      slider?: {
        className?: string
        style?: CSSProperties
      }
    }
    y?: {
      track?: {
        className?: string
        style?: CSSProperties
      }
      slider?: {
        className?: string
        style?: CSSProperties
      }
    }
  }
}

function Scrollbar(props: ScrollbarProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    enabled = true,
    display = 'always',
    containerRef,
    className,
    children,
    styles,
    ...rest
  } = props

  const { hoverShow, ...listeners } = useHoverShow({ display })

  const enabledX = enabled === true || enabled === 'x'
  const enabledY = enabled === true || enabled === 'y'

  const contentRef = useRef<HTMLDivElement>(null)
  const trackXRef = useRef<HTMLDivElement>(null)
  const trackYRef = useRef<HTMLDivElement>(null)
  const sliderYRef = useRef<HTMLDivElement>(null)
  const sliderXRef = useRef<HTMLDivElement>(null)

  const [size, setSize] = useState({ height: 0, width: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const raf = useRef<number>()
  const dispatchUpdate = useCallback((callback: () => void) => {
    if (raf.current) {
      window.cancelAnimationFrame(raf.current)
    }
    raf.current = window.requestAnimationFrame(() => {
      callback()
    })
  }, [])

  const getTrackSize = useCallback(() => {
    const result = {
      x: trackXRef.current?.clientWidth || 0,
      y: trackYRef.current?.clientHeight || 0,
    }
    return result
  }, [])

  const getSliderSize = useCallback(() => {
    const result = { height: 0, width: 0 }
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
      contentRef.current!
    const { x: trackWidth, y: trackHeight } = getTrackSize()
    result.height = Math.ceil((clientHeight / scrollHeight) * trackHeight)
    result.width = Math.ceil((clientWidth / scrollWidth) * trackWidth)
    return result
  }, [getTrackSize])

  const handleScroll = () => {
    dispatchUpdate(() => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollLeft,
        scrollWidth,
        clientWidth,
      } = contentRef.current!
      const { x: trackWidth, y: trackHeight } = getTrackSize()
      const { height: sliderHeight, width: sliderWidth } = getSliderSize()

      if (sliderYRef.current) {
        const top =
          (scrollTop / (scrollHeight - clientHeight)) *
          (trackHeight - sliderHeight)
        size.height = sliderHeight
        sliderYRef.current.style.height = `${sliderHeight}px`
        sliderYRef.current.style.transform = `translateY(${top}px)`
      }
      if (sliderXRef.current) {
        const left =
          (scrollLeft / (scrollWidth - clientWidth)) *
          (trackWidth - sliderWidth)
        size.width = sliderWidth
        sliderXRef.current.style.width = `${sliderWidth}px`
        sliderXRef.current.style.transform = `translateX(${left}px)`
      }
    })
  }

  const signal = useRef({
    mousemove: new Set<AbortController>(),
    mouseup: new Set<AbortController>(),
  })

  const getScrollTopForOffset = (offset: number) => {
    const { scrollHeight, clientHeight } = contentRef.current!
    const { y: trackHeight } = getTrackSize()
    const { height: thumbHeight } = getSliderSize()
    return (
      (offset / (trackHeight - thumbHeight)) * (scrollHeight - clientHeight)
    )
  }

  const getScrollLeftForOffset = (offset: number) => {
    const { scrollWidth, clientWidth } = contentRef.current!
    const { x: trackWidth } = getTrackSize()
    const { width: thumbWidth } = getSliderSize()
    return (offset / (trackWidth - thumbWidth)) * (scrollWidth - clientWidth)
  }

  const prevPageY = useRef(0)
  const prevPageX = useRef(0)

  const handleDrag = (event: MouseEvent) => {
    const { clientY, clientX } = event
    const { height, width } = getSliderSize()

    if (prevPageY.current) {
      setIsDragging(true)
      const { top: trackTop } = trackYRef.current!.getBoundingClientRect()
      const clickPosition = height - prevPageY.current
      const offset = -trackTop + clientY - clickPosition
      contentRef.current!.scrollTop = getScrollTopForOffset(offset)
    }
    if (prevPageX.current) {
      setIsDragging(true)
      const { left: trackLeft } = trackXRef.current!.getBoundingClientRect()
      const clickPosition = width - prevPageX.current
      const offset = -trackLeft + clientX - clickPosition
      contentRef.current!.scrollLeft = getScrollLeftForOffset(offset)
    }
  }

  const handleDragEnd = () => {
    signal.current.mousemove.forEach((fn) => fn.abort())
    signal.current.mouseup.forEach((fn) => fn.abort())
    signal.current.mousemove.clear()
    signal.current.mouseup.clear()
    prevPageX.current = 0
    prevPageY.current = 0
    setIsDragging(false)
  }

  const handleMouseDownForSliderY = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault()

    const { currentTarget, clientY } = e
    const { offsetHeight } = currentTarget
    const { top } = currentTarget.getBoundingClientRect()
    prevPageY.current = offsetHeight - (clientY - top)

    const mousemoveSignal = new AbortController()
    const mouseupSignal = new AbortController()
    signal.current.mousemove.add(mousemoveSignal)
    signal.current.mouseup.add(mouseupSignal)

    document.addEventListener('mousemove', handleDrag, {
      signal: mousemoveSignal.signal,
    })
    document.addEventListener('mouseup', handleDragEnd, {
      signal: mouseupSignal.signal,
    })
  }

  const handleMouseDownForSliderX = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault()

    const { currentTarget, clientX } = e
    const { offsetWidth } = currentTarget
    const { left } = currentTarget.getBoundingClientRect()
    prevPageX.current = offsetWidth - (clientX - left)

    const mousemoveSignal = new AbortController()
    const mouseupSignal = new AbortController()
    signal.current.mousemove.add(mousemoveSignal)
    signal.current.mouseup.add(mouseupSignal)

    document.addEventListener('mousemove', handleDrag, {
      signal: mousemoveSignal.signal,
    })
    document.addEventListener('mouseup', handleDragEnd, {
      signal: mouseupSignal.signal,
    })
  }

  useLayoutEffect(() => {
    dispatchUpdate(() => setSize(getSliderSize()))
  }, [dispatchUpdate, getSliderSize])

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      {...rest}
      ref={containerRef}
      className={cx(
        'are-scrollbar',
        { 'are-scrollbar-hidden': display === 'hover' && !hoverShow },
        className,
      )}
      onMouseEnter={(e) => {
        listeners.onMouseEnter()
        rest.onMouseEnter?.(e)
      }}
      onMouseOut={(e) => {
        listeners.onMouseOut()
        rest.onMouseOut?.(e)
      }}
      onMouseLeave={(e) => {
        listeners.onMouseLeave()
        rest.onMouseLeave?.(e)
      }}
    >
      <div
        ref={composeRef(contentRef, ref)}
        className={cx('are-scrollbar-content')}
        onScroll={handleScroll}
      >
        {children}
      </div>
      {enabledX && (
        <div
          ref={trackXRef}
          className={cx(
            'are-scrollbar-track are-scrollbar-track-x',
            styles?.x?.track?.className,
          )}
          style={styles?.x?.track?.style}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            ref={sliderXRef}
            className={cx(
              'are-scrollbar-slider are-scrollbar-slider-x',
              {
                'are-scrollbar-slider-dragging':
                  isDragging && prevPageX.current,
              },
              styles?.x?.slider?.className,
            )}
            style={{ ...styles?.x?.slider?.style, width: size.width }}
            onMouseDown={handleMouseDownForSliderX}
          />
        </div>
      )}
      {enabledY && (
        <div
          ref={trackYRef}
          className={cx(
            'are-scrollbar-track are-scrollbar-track-y',
            styles?.y?.track?.className,
          )}
          style={styles?.y?.track?.style}
        >
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            ref={sliderYRef}
            className={cx(
              'are-scrollbar-slider are-scrollbar-slider-y',
              {
                'are-scrollbar-slider-dragging':
                  isDragging && prevPageY.current,
              },
              styles?.y?.slider?.className,
            )}
            style={{ ...styles?.y?.slider?.style, height: size.height }}
            onMouseDown={handleMouseDownForSliderY}
          />
        </div>
      )}
    </div>
  )
}

export default forwardRef(Scrollbar)
