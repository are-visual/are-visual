import { PortalTarget } from '@are-visual/portal-hosts'
import canUseDom from 'rc-util/es/Dom/canUseDom'
import { FC, ReactNode, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'

import useContainer from './useContainer'

export interface PortalProps {
  /**
   * 是否可见，为 true 时操作 DOM，仅一次生效。
   *
   * @default true
   */
  visible?: boolean
  /**
   * 渲染目标位置
   *
   * 为 null 则表示渲染在当前 DOM 上
   */
  target?: PortalTarget
  children?: ReactNode
}

function useFinalValue<T, F extends T>(value: T, finalValue: F) {
  const skip = useRef(false)

  return useMemo(() => {
    if (skip.current) return finalValue
    if (value === finalValue) {
      skip.current = true
      return finalValue
    }
    return value
  }, [finalValue, value])
}

const Portal: FC<PortalProps> = (props) => {
  const { visible, target, children } = props

  const render = useFinalValue(visible, true)
  const container = useContainer({ target, render })

  if (!render || !canUseDom()) {
    return null
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!container) return <>{children}</>

  return createPortal(children, container)
}

export default Portal
