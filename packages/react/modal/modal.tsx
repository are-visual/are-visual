import './styles/index.scss'

import { Popup, PopupProps } from '@are-visual/react-popup'
import { ReactComponent as CloseIcon } from '@are-visual/resources/close.svg'
import type { Omit } from '@are-visual/utils'
import cx from 'clsx'
import React, { CSSProperties, forwardRef, ReactNode } from 'react'

type InternalPopupProps = Omit<PopupProps, 'position'>

export interface ModalProps extends InternalPopupProps {
  title?: ReactNode
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  /**
   * 显示右上角关闭按钮
   */
  showCloseButton?: boolean
  /**
   * 水平、垂直居中对齐
   *
   * @default false
   */
  centered?: boolean
}

const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    title,
    children,
    centered = false,
    className,
    style,
    wrapperClass,
    wrapperStyle,
    showCloseButton = true,
    onClose,
    ...rest
  } = props

  const ariaLabelledby = typeof title === 'string' ? title : undefined
  const position = centered ? 'center' : 'x-center'

  return (
    <Popup
      {...rest}
      className={cx(wrapperClass, 'are-modal-wrapper', {
        'are-modal-top': !centered,
      })}
      style={wrapperStyle}
      position={position}
      ref={ref}
      onClose={onClose}
      aria-labelledby={ariaLabelledby}
    >
      <div className={cx(className, 'are-modal')} style={style}>
        <header className="are-modal-header">
          <div className="are-modal-title">{title}</div>
          {showCloseButton && (
            <button
              className="are-modal-close-btn"
              aria-label="关闭对话框"
              title="关闭对话框"
              type="button"
              onClick={onClose}
            >
              <CloseIcon className="are-modal-close-icon" />
            </button>
          )}
        </header>
        {children}
      </div>
    </Popup>
  )
})

export default Modal
