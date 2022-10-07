import { noop } from 'lodash-es'
import { MouseEvent } from 'react'

interface SameTarget {
  onClick: (event: MouseEvent<HTMLElement>) => void
  onMouseDown: (event: MouseEvent<HTMLElement>) => void
  onMouseUp: (event: MouseEvent<HTMLElement>) => void
}

const defaultEvent: SameTarget = {
  onClick: noop,
  onMouseDown: noop,
  onMouseUp: noop,
}

const useSameTarget = (
  handleClick?: (e: MouseEvent<HTMLElement>) => void,
): SameTarget => {
  if (!handleClick) return defaultEvent
  let mousedownTarget = false
  let mouseupTarget = false

  // refer to this https://javascript.info/mouse-events-basics
  // events fired in the order: mousedown -> mouseup -> click
  // we need to set the mousedown handle to false after click fired.

  const onMouseDown = (e: MouseEvent<HTMLElement>) => {
    // marking current mousedown target.
    mousedownTarget = e.target === e.currentTarget
  }

  const onClick = (e: MouseEvent<HTMLElement>) => {
    // if and only if
    if (mousedownTarget && mouseupTarget) {
      handleClick(e)
    }
    mousedownTarget = false
    mouseupTarget = false
  }

  const onMouseUp = (e: MouseEvent<HTMLElement>) => {
    // marking current mouseup target.
    mouseupTarget = e.target === e.currentTarget
  }

  return { onClick, onMouseDown, onMouseUp }
}

export default useSameTarget
