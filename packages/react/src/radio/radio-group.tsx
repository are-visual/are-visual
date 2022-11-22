import './styles/group.scss'

import {
  useControllableValue,
  useIsomorphicEffect,
} from '@are-visual/react-hooks'
import cx from 'clsx'
import { isNil } from 'lodash-es'
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

import { RadioState, RadioStateShape } from './context'
import type { RadioRenderFn } from './interface'

type NativeDivElement = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export interface RadioGroupProps<T = string> extends RadioStateShape<T> {
  defaultValue?: T
  /**
   * Horizontal or vertical orientation.
   *
   * 排列方向
   *
   * @default "x"
   */
  direction?: 'x' | 'y'
  /**
   * Spacing between radios.
   *
   * 间距大小
   */
  spacing?: string
  /**
   * Custom radios rendering
   *
   * 自定义 Radio 节点渲染
   */
  render?: RadioRenderFn<T>
}

type RadioGroupRef = HTMLDivElement | null

type InternalRadioGroupProps<T = string> = Omit<
  NativeDivElement,
  keyof RadioGroupProps<T>
> &
  RadioGroupProps<T>

function RadioGroup<T>(
  props: InternalRadioGroupProps<T>,
  ref: ForwardedRef<RadioGroupRef>,
) {
  const {
    children,
    name,
    disabled,
    direction = 'x',
    spacing,
    className,
    render,

    // 仅仅从 props 中解构，防止通过 rest 传递到 div 中
    defaultValue: _defaultValue,
    value: _value,
    onChange: _handleChange,

    ...rest
  } = props

  const [value, onChange] = useControllableValue<T | undefined>(props)

  const state = useMemo<RadioStateShape<T>>(() => {
    return { value, name, disabled, onChange, render }
  }, [disabled, name, onChange, value, render])

  const groupElement = useRef<RadioGroupRef>(null)

  useIsomorphicEffect(() => {
    const target = groupElement.current
    if (!target || isNil(spacing)) return
    target.style.setProperty('--are-radio-spacing', spacing)
  }, [spacing])

  useImperativeHandle<RadioGroupRef, RadioGroupRef>(
    ref,
    () => groupElement.current,
  )

  return (
    <RadioState.Provider value={state}>
      <div
        {...rest}
        ref={groupElement}
        className={cx(
          'are-radio-group',
          {
            'are-radio-group-x': direction === 'x',
            'are-radio-group-y': direction === 'y',
          },
          className,
        )}
      >
        {children}
      </div>
    </RadioState.Provider>
  )
}

export default forwardRef(RadioGroup) as <T>(
  props: InternalRadioGroupProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>
  },
) => ReturnType<typeof RadioGroup>
