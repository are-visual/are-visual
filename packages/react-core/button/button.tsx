import type { Mapping } from '@are-visual/utils'
import {
  createElement,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  RefAttributes,
} from 'react'

import type {
  DOMOf,
  NativeButtonClick,
  NativeButtonType,
  PropsOf,
  ReactHTMLKeys,
} from './interface'

export interface ButtonCoreProps {
  /**
   * 原生 button 类型
   */
  htmlType?: NativeButtonType
  /**
   * button 禁用状态，渲染为其他标签时，将阻止 onClick 事件。
   */
  disabled?: boolean
}

type DynamicOverload<T extends ReactHTMLKeys> = Mapping<PropsOf<T>> &
  RefAttributes<DOMOf<T>> & { component: T }

type ButtonOverload = PropsOf<'button'> & {
  component?: ReactHTMLKeys
} & RefAttributes<HTMLButtonElement>

type DefinProp<T> = PropsWithChildren<ButtonCoreProps & T>

interface ButtonCoreComponent {
  <T extends ReactHTMLKeys>(
    props: DefinProp<DynamicOverload<T>>,
    ref: DOMOf<T>,
  ): ReactElement | null
  (
    props: DefinProp<ButtonOverload>,
    ref: HTMLButtonElement,
  ): ReactElement | null
  displayName?: string | undefined
}

const ButtonCore: ButtonCoreComponent = forwardRef<
  HTMLElement,
  DefinProp<ButtonOverload>
>((props, ref) => {
  const {
    children,
    component = 'button',
    htmlType = 'button',
    disabled = false,
    onClick,
    ...rest
  } = props

  const handleClick: NativeButtonClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  return createElement(
    component,
    { ...rest, ref, type: htmlType, onClick: handleClick },
    children,
  )
})

ButtonCore.displayName = 'ButtonCore'

export default ButtonCore
