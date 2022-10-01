import './styles/index.scss'

import { useId } from '@are-visual/react-hooks'
import cx from 'clsx'
import React, { ForwardedRef, forwardRef, PropsWithChildren } from 'react'

import { useRadioState } from './context'

type NativeRadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type RadioChangeHandler = NonNullable<NativeRadioProps['onChange']>

export interface RadioProps<T>
  extends Omit<NativeRadioProps, 'value' | 'onChange'> {
  value: T
  onChange?: (value: T, event: Parameters<RadioChangeHandler>[0]) => void
}

function RadioInner<T = string>(
  props: PropsWithChildren<RadioProps<T>>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    children,
    className,
    style,
    id,
    value,
    onChange,
    disabled: scopedDisabled,
    name: scopedName,
    ...rest
  } = props

  const ctx = useRadioState()
  const {
    name: injectName,
    disabled: injectDisabled,
    value: activeValue,
    onChange: updateValue,
  } = ctx || {}

  const radioId = useId(id)
  const name = scopedName ?? injectName
  const disabled = injectDisabled ?? scopedDisabled
  const checked = Object.is(value, activeValue)

  const handleChange: RadioChangeHandler = (e) => {
    if (disabled || checked) return
    updateValue?.(value, e)
    onChange?.(value, e)
  }

  return (
    <div
      className={cx(
        'are-radio',
        {
          'are-radio-checked': Object.is(value, activeValue),
          'are-radio-disabled': disabled,
        },
        className,
      )}
      style={style}
    >
      <input
        {...rest}
        ref={ref}
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

const Radio = forwardRef(RadioInner) as <T>(
  props: PropsWithChildren<RadioProps<T>> & {
    ref?: React.ForwardedRef<HTMLInputElement>
  },
) => ReturnType<typeof RadioInner>

export default Radio
