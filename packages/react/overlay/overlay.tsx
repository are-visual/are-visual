import './styles/index.scss'

import { useIsomorphicEffect, useScrollLock } from '@are-visual/react-hooks'
import cx from 'clsx'
import CSSMotion from 'rc-motion'
import canUseDom from 'rc-util/es/Dom/canUseDom'
import React, { FC, HTMLAttributes } from 'react'

interface PureOverlayProps {
  /**
   * 是否显示
   */
  visible?: boolean
  /**
   * DOM 层级
   * @default 10
   */
  zIndex?: number
  /**
   * 渲染位置
   */
  container?: HTMLElement
  /**
   * 关闭函数
   */
  onClose?: () => void
}

export type OverlayProps = PureOverlayProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof PureOverlayProps>

const Overlay: FC<OverlayProps> = (props) => {
  const {
    className,
    style,
    visible,
    zIndex = 10,
    container,
    onClose,
    ...rest
  } = props

  const lock = useScrollLock()
  useIsomorphicEffect(() => {
    if (canUseDom()) {
      lock(!!visible)
    }
  }, [lock, visible])

  return (
    <CSSMotion
      key="are-overlay"
      visible={visible}
      motionName="are-overlay-motion"
      leavedClassName="are-overlay-hidden"
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
