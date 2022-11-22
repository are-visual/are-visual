import cx from 'clsx'
import { forwardRef, HTMLAttributes, ReactNode } from 'react'

export interface ModalFooterProps extends HTMLAttributes<HTMLElement> {
  /**
   *
   */
  defaultBg?: boolean
  /**
   * 覆盖按钮圆角大小
   *
   * @default true
   */
  overrideBtnRounded?: boolean
  children?: ReactNode
}

const ModalFooterComponent = forwardRef<HTMLElement, ModalFooterProps>(
  function ModalFooter(props, ref) {
    const {
      children,
      className,
      defaultBg = true,
      style,
      overrideBtnRounded = true,
      ...rest
    } = props

    return (
      <footer
        {...rest}
        className={cx(
          'are-modal-footer',
          { 'are-modal-footer-bg': defaultBg },
          className,
        )}
        style={{
          ...style,
          // @ts-ignore
          '--are-btn-rounded': overrideBtnRounded ? '4px' : undefined,
        }}
        ref={ref}
      >
        {children}
      </footer>
    )
  },
)

export default ModalFooterComponent
