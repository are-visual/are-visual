import { isFragment } from '@are-visual/utils'
import cx from 'clsx'
import CSSMotion from 'rc-motion'
import React, {
  Children,
  cloneElement,
  createElement,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useState,
} from 'react'

import { Portal, PortalTarget } from '../portal'
import { leavedClassName, popoverContentWrapper } from './styles'

export type PopoverTriggerType = 'hover' | 'focus' | 'click' | 'contextMenu'
export type PopoverPlaceMentType =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'

export interface PopoverProps
  extends Pick<
    HTMLAttributes<HTMLElement>,
    'onMouseEnter' | 'className' | 'style'
  > {
  content?: ReactNode
  /**
   * 位置
   *
   * @default "top"
   */
  placement?: PopoverPlaceMentType
  // trigger?: PopoverTriggerType | PopoverTriggerType[]
  children: ReactElement
  /**
   * 渲染到指定 DOM 节点，默认渲染至 body
   */
  renderTo?: PortalTarget
}

const Popover: FC<PopoverProps> = (props) => {
  const {
    className,
    style,
    children,
    renderTo,
    content,
    placement = 'top',
    onMouseEnter: onMouseEnterInternal,
  } = props

  const [visible, setVisible] = useState(false)
  const [opened, setOpened] = useState(false)
  const [point, setPoint] = useState(() => ({ x: 0, y: 0 }))

  const child = Children.only(children) as ReactElement

  const injectProps: HTMLAttributes<HTMLElement> = {
    className,
    style,
    onMouseEnter: (e) => {
      const { onMouseEnter } = child.props
      onMouseEnter?.(e)
      onMouseEnterInternal?.(e)
      setPoint({ x: e.pageX, y: e.pageY })
      setVisible(true)
      setOpened(true)
    },
    onMouseLeave: (e) => {
      setVisible(false)
    },
  }

  let trigger: ReactElement

  if (isFragment(child)) {
    injectProps.className = cx('are-popover-trigger', className)
    trigger = createElement('span', injectProps, child)
  } else {
    trigger = cloneElement(child, injectProps)
  }

  return (
    <>
      {trigger}
      <Portal visible={visible}>
        <CSSMotion
          visible={visible}
          motionName="are-zoom-in-motion"
          removeOnLeave={false}
          leavedClassName={leavedClassName().className}
        >
          {({ className: motionClassName, style: motionStyle }, motionRef) => (
            <div
              className={cx(motionClassName, popoverContentWrapper().className)}
              style={{ ...motionStyle, left: point.x, top: point.y }}
              ref={motionRef}
            >
              {content}
            </div>
          )}
        </CSSMotion>
      </Portal>
    </>
  )
}

export default Popover
