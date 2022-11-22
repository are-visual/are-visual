import './styles/index.scss'
import '@are-visual/styles/motion/slide'
import '@are-visual/styles/motion/zoom-in'

import {
  useIsomorphicEffect,
  useSameTarget,
  useScrollLock,
} from '@are-visual/react-hooks'
import cx from 'clsx'
import CSSMotion from 'rc-motion'
import canUseDom from 'rc-util/es/Dom/canUseDom'
import { composeRef } from 'rc-util/es/ref'
import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from 'react'

import { Overlay, OverlayProps, PureOverlayProps } from '../overlay'

export type PopupPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'center'
  | 'x-center'

export interface PopupProps
  extends Pick<PureOverlayProps, 'visible' | 'zIndex' | 'lockScroll'> {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /**
   * 弹出位置
   */
  position?: PopupPosition
  /**
   * 点击弹出层外部区域是否可关闭
   *
   * @default true
   */
  closeOnClickOutside?: boolean
  /**
   * 自定义动画
   */
  motionName?: string
  /**
   * Should modal be closed when escape is pressed?
   *
   * 按下 ESC 键关闭
   *
   * @default true
   */
  closeOnEscape?: boolean
  /**
   * 是否渲染遮罩层
   *
   * @default true
   */
  showOverlay?: boolean
  /**
   * 遮罩层 Props
   */
  overlayProps?: Omit<OverlayProps, keyof PureOverlayProps>
  /**
   * 是否强制渲染 DOM
   *
   * @default false
   */
  forceRender?: boolean
  /**
   * Destroy the DOM node when visible is false.
   *
   * visible 为 false 时销毁 DOM 节点
   *
   * @default false
   */
  destroyable?: boolean
  /**
   * 关闭时的回调
   */
  onClose?: () => void
  /**
   * 关闭之后的回调
   */
  onAfterClose?: () => void
}

export type PopupPropsWithNative = PropsWithoutRef<
  PopupProps & Omit<HTMLAttributes<HTMLDivElement>, keyof PopupProps>
>

const POPUP_MOTION_NAME: Record<PopupPosition, string> = {
  top: 'are-slide-from-top-motion',
  right: 'are-slide-from-right-motion',
  bottom: 'are-slide-from-bottom-motion',
  left: 'are-slide-from-left-motion',
  center: 'are-zoom-in-motion',
  'x-center': 'are-zoom-in-motion',
}

const PopupInner = forwardRef<HTMLDivElement, PopupPropsWithNative>(
  function Popup(props, ref) {
    const {
      visible = false,
      zIndex = 10,
      className,
      style,
      position,
      showOverlay = true,
      closeOnClickOutside = true,
      closeOnEscape = true,
      lockScroll = true,
      motionName: scopedMotionName,
      overlayProps,
      children,
      onClose,
      forceRender,
      onAfterClose,
      destroyable,
      ...rest
    } = props

    const [animatedVisible, setAnimatedVisible] = useState(visible)
    const handleVisibleChanged = (nextVisible: boolean) => {
      if (nextVisible) return
      setAnimatedVisible(false)
      onAfterClose?.()
    }
    useEffect(() => {
      if (!visible) return
      setAnimatedVisible(true)
    }, [visible])

    // 按下 ESC 按键
    useEffect(() => {
      if (!closeOnEscape) return
      const fn = (e: KeyboardEvent) => {
        if (e.key !== 'Escape') return
        e.stopPropagation()
        onClose?.()
      }
      document.addEventListener('keyup', fn)
      return () => {
        document.removeEventListener('keyup', fn)
      }
    }, [closeOnEscape, onClose])

    // 点击外层关闭
    const outsideClick = () => {
      if (showOverlay && !closeOnClickOutside) return
      onClose?.()
    }
    const outsideEvent = useSameTarget(showOverlay ? outsideClick : undefined)

    const lock = useScrollLock()
    useIsomorphicEffect(() => {
      if (!lockScroll || !canUseDom()) return
      lock(!!visible)
    }, [lockScroll, lock, visible])

    const shouldLock =
      position === 'right' ||
      position === 'bottom' ||
      position === 'top' ||
      position === 'left'
    const isCenter = position === 'center' || position === 'x-center'
    const positionClass = position ? `are-popup-body-${position}` : ''
    const motionName = scopedMotionName ?? POPUP_MOTION_NAME[position!]

    return (
      <div
        className="are-popup-root"
        style={{ display: animatedVisible ? undefined : 'none' }}
      >
        {showOverlay && (
          <Overlay
            {...overlayProps}
            lockScroll={false}
            visible={visible}
            zIndex={zIndex}
          />
        )}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          className={cx('are-popup', {
            [positionClass]: isCenter,
            'are-popup-lock': shouldLock,
          })}
          style={{ zIndex }}
          onClick={outsideEvent.onClick}
          onMouseDown={outsideEvent.onMouseDown}
          onMouseUp={outsideEvent.onMouseUp}
        >
          <CSSMotion
            visible={visible}
            motionName={motionName}
            onVisibleChanged={handleVisibleChanged}
            forceRender={forceRender}
            removeOnLeave={destroyable}
          >
            {(
              { className: motionClassName, style: motionStyle },
              motionRef,
            ) => (
              <div
                role="dialog"
                {...rest}
                className={cx(
                  { 'are-popup-body': true, [positionClass]: !isCenter },
                  className,
                  motionClassName,
                )}
                style={{ ...style, ...motionStyle }}
                ref={composeRef(ref, motionRef)}
              >
                {children}
              </div>
            )}
          </CSSMotion>
        </div>
      </div>
    )
  },
)

export default PopupInner
