import './styles/index.scss'

import { useIsomorphicEffect, useScrollLock } from '@are-visual/react-hooks'
import cx from 'clsx'
import CSSMotion from 'rc-motion'
import canUseDom from 'rc-util/es/Dom/canUseDom'
import React, { FC, HTMLAttributes, useEffect } from 'react'

export interface PureOverlayProps {
  /**
   * Whether to show.
   *
   * 是否显示
   */
  visible?: boolean
  /**
   * Sets the `z-index`.
   *
   * DOM 层级
   *
   * @default 10
   */
  zIndex?: number
  /**
   * Destroy the DOM node when visible is false.
   *
   * visible 为 false 时销毁 DOM 节点
   *
   * @default false
   */
  destroyable?: boolean
  /**
   * Whether to lock body scrolling.
   *
   * 为 true 时将禁止 body 滚动
   *
   * @default true
   */
  lockScroll?: boolean
}

export type OverlayProps = PureOverlayProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof PureOverlayProps>

const Overlay: FC<OverlayProps> = (props) => {
  const {
    className,
    style,
    visible,
    zIndex = 10,
    destroyable = false,
    lockScroll = true,
    ...rest
  } = props

  const lock = useScrollLock()
  useIsomorphicEffect(() => {
    if (!lockScroll || !canUseDom()) return
    lock(!!visible)
  }, [lockScroll, lock, visible])

  useEffect(() => () => lock(false), [lock])

  return (
    <CSSMotion
      key="are-overlay"
      visible={visible}
      motionName="are-fade-in-motion"
      leavedClassName="are-overlay-hidden"
      removeOnLeave={destroyable}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          {...rest}
          style={{ ...motionStyle, ...style, zIndex }}
          className={cx('are-overlay', motionClassName)}
        />
      )}
    </CSSMotion>
  )
}

export default Overlay
