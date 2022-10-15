import './styles/index.scss'

import { useId } from '@are-visual/react-hooks'
import cx from 'clsx'
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from 'react'

import { useRadioState } from './context'
import { RadioRenderFn } from './interface'

type NativeRadioProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
export type RadioChangeEvent = ChangeEvent<HTMLInputElement>

interface InternalRadioProps<T>
  extends Omit<NativeRadioProps, 'value' | 'onChange'> {
  /**
   * Radio value.
   */
  value: T
}

export interface CustomRadioProps<T>
  extends Omit<InternalRadioProps<T>, 'ref'> {
  ref?: ForwardedRef<unknown>
  /**
   * 自定义渲染（权重相比 Radio.Group render 较高）
   *
   * Custom rendering (higher weighting compared to Radio.Group render)
   */
  render: RadioRenderFn<T>
  onChange?: (value: T, event?: RadioChangeEvent) => void
}

export interface RadioProps<T> extends InternalRadioProps<T> {
  /**
   * 自定义渲染（权重相比 Radio.Group render 较高）
   *
   * Custom rendering (higher weighting compared to Radio.Group render)
   */
  render?: RadioRenderFn<T>
  onChange?: (value: T, event: RadioChangeEvent) => void
}

function Radio<T = string>(
  props: CustomRadioProps<T>,
  ref: ForwardedRef<unknown>,
): ReactElement
function Radio<T = string>(
  props: RadioProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement
function Radio<T = string>(
  props: CustomRadioProps<T> | RadioProps<T>,
  ref: ForwardedRef<unknown> | ForwardedRef<HTMLInputElement>,
): ReactElement {
  const {
    children,
    className,
    style,
    id,
    value,
    onChange,
    disabled: scopedDisabled,
    name: scopedName,
    render: scopedRender,
    ...rest
  } = props

  const ctx = useRadioState()
  const {
    name: injectName,
    disabled: injectDisabled,
    value: activeValue,
    onChange: updateValue,
    render: injectRender,
  } = ctx || {}

  const radioId = useId(id)
  const name = scopedName ?? injectName
  const disabled = injectDisabled ?? scopedDisabled
  const checked = Object.is(value, activeValue)
  const render = scopedRender ?? injectRender

  const handleChange = (e?: RadioChangeEvent) => {
    if (disabled || checked) return
    updateValue?.(value, e)
    onChange?.(value, e as RadioChangeEvent)
  }

  if (render) {
    return render({
      value,
      disabled,
      checked,
      name,
      children,
      setActive: () => handleChange(),
    })
  }

  return (
    <div
      className={cx(
        'are-radio',
        {
          'are-radio-checked': checked,
          'are-radio-disabled': disabled,
        },
        className,
      )}
      style={style}
    >
      <input
        tabIndex={0}
        {...rest}
        ref={ref as ForwardedRef<HTMLInputElement>}
        id={radioId}
        type="radio"
        className="are-radio-icon"
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
      />
      <label className={cx('are-radio-label')} htmlFor={radioId}>
        {children}
      </label>
    </div>
  )
}

interface RadioComponent {
  <T>(
    props: CustomRadioProps<T> & {
      ref?: ForwardedRef<unknown>
    },
  ): ReactElement
  <T>(
    props: RadioProps<T> & {
      ref?: ForwardedRef<HTMLInputElement>
    },
  ): ReactElement
}

export default forwardRef(Radio) as RadioComponent
