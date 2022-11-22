import { forwardRef, useEffect, useState } from 'react'

import { Portal, PortalTarget } from '../portal'
import PopupInner, { PopupPropsWithNative } from './popup-inner'

export interface PopupProps extends PopupPropsWithNative {
  /**
   * 渲染到指定 DOM 节点，默认渲染至 body
   */
  renderTo?: PortalTarget
}

const PopupWrapper = forwardRef<HTMLDivElement, PopupProps>(function Popup(
  props,
  ref,
) {
  const {
    visible = false,
    destroyable = false,
    children,
    renderTo,
    forceRender = false,
    onAfterClose,
    ...rest
  } = props

  const [animatedVisible, setAnimatedVisible] = useState(visible)

  useEffect(() => {
    if (!visible) return
    setAnimatedVisible(true)
  }, [visible])

  return (
    <Portal
      visible={visible || forceRender || animatedVisible}
      target={renderTo}
    >
      <PopupInner
        visible={visible && animatedVisible}
        forceRender={forceRender}
        destroyable={destroyable}
        onAfterClose={() => {
          setAnimatedVisible(false)
          onAfterClose?.()
        }}
        ref={ref}
        {...rest}
      >
        {children}
      </PopupInner>
    </Portal>
  )
})

export default PopupWrapper
