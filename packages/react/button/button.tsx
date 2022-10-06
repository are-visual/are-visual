import './styles/button.scss'

import cx from 'clsx'
import React, { forwardRef } from 'react'

import {
  DefaultOverload,
  DynamicComponent,
  DynamicTag,
  HTMLProps,
} from '../dynamic-tag'
import { InlineLoading } from '../loading'

type NativeButtonProps = HTMLProps<'button'>
type ClickHandler = NonNullable<NativeButtonProps['onClick']>

export interface ButtonProps {
  /**
   * button theme, corresponding to the different styles.
   *
   * button 主题，对应不同的样式。
   *
   * @default "default"
   */
  variant?:
    | 'default'
    | 'filled'
    | 'same'
    | 'white'
    | 'outline'
    | 'text'
    | 'text-same'
  /**
   * button Background color
   *
   * button 背景色
   *
   * @default "gray"
   */
  color?: 'gray' | 'red' | 'orange' | 'green' | 'none'
  /**
   * button Text color
   *
   * button 文字颜色
   */
  textColor?: 'white' | 'black'
  /**
   * button Size.
   *
   * 按钮尺寸
   *
   * @default "middle"
   */
  size?: 'large' | 'middle' | 'small' | 'none'
  /**
   * The button is disabled and will block onClick events when rendered as other labels.
   *
   * button 禁用状态，渲染为其他标签时，将阻止 onClick 事件。
   */
  disabled?: boolean
  /**
   * Sets the `border-radius` of the button
   *
   * 圆角曲率
   *
   * @default true
   */
  rounded?: number | string | true
  /**
   * Sets button width to 100% of parent element
   *
   * 全宽按钮，宽度设置为 100%
   */
  fullWidth?: boolean
  /**
   * Loading state
   *
   * 加载状态
   */
  loading?: boolean
}

type ButtonComponent = DynamicComponent<'button', ButtonProps>

const Button: ButtonComponent = forwardRef<
  HTMLElement,
  DefaultOverload<'button'> & ButtonProps
>((props, ref) => {
  const {
    children,
    className,
    style,
    renderAs = 'button',
    variant = 'default',
    color = 'gray',
    textColor,
    size = 'middle',
    rounded = true,
    fullWidth,
    disabled,
    loading = false,
    onClick,
    ...rest
  } = props

  const handleClick: ClickHandler = (e) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  const sameGray = color === 'gray' && variant === 'same'

  return (
    <DynamicTag
      {...rest}
      style={{
        ...style,
        borderRadius: rounded !== true ? rounded : undefined,
      }}
      className={cx(
        'are-btn',
        {
          'are-btn-full-width': fullWidth,
          'are-btn-disabled': disabled,
          'are-btn-default': variant === 'default',
          'are-btn-filled': variant === 'filled',
          'are-btn-same': variant === 'same',
          'are-btn-white': variant === 'white',
          'are-btn-outline': variant === 'outline',
          'are-btn-text': variant === 'text',
          'are-btn-text-same': variant === 'text-same',
          // 'are-btn-primary': color === 'primary',
          'are-btn-red': color === 'red',
          'are-btn-orange': color === 'orange',
          'are-btn-green': color === 'green',
          'are-btn-gray are-btn-text-dark': color === 'gray' || sameGray,
          'are-btn-text-light': textColor === 'white',
          'are-btn-text-dark': textColor === 'black',
          'are-btn-large': size === 'large',
          'are-btn-middle': size === 'middle',
          'are-btn-small': size === 'small',
          'are-btn-gray-border': color === 'gray' && variant === 'outline',
          'are-btn-rounded': rounded === true,
          'are-btn-remove-bg':
            (variant === 'text' || variant === 'text-same') && disabled,
          'are-btn-loading': loading,
        },
        className,
      )}
      renderAs={renderAs}
      ref={ref}
      onClick={handleClick}
    >
      <InlineLoading spinning={loading} style={{ paddingRight: 6 }} />
      {children}
    </DynamicTag>
  )
})

Button.displayName = 'AreButton'

export default Button
