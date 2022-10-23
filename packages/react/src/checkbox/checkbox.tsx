import { useControllableValue, useId } from '@are-visual/react-hooks'
import { ReactComponent as CheckedIcon } from '@are-visual/resources/check.svg'
import { Omit } from '@are-visual/utils'
import cx from 'clsx'
import CSSMotion from 'rc-motion'
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'

import {
  checkboxInput,
  checkboxWrapper,
  checkedIcon,
  checkedIconWrapper,
  checkedMotion,
  label,
  root,
} from './styles'

type NativeProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'value' | 'onChange'
>

type CheckboxRef = ForwardedRef<HTMLInputElement>

interface CheckboxCoreProps<T> extends NativeProps {
  /**
   * 不确定状态
   */
  indeterminate?: boolean
  // eslint-disable-next-line react/no-unused-prop-types
  onCheckedChange?: (checked: boolean) => void
  children?: ReactNode
  onChange?: (
    value: T | undefined,
    event: ChangeEvent<HTMLInputElement>,
  ) => void
}

interface CheckboxP1Props<T = boolean>
  extends Omit<CheckboxCoreProps<T>, 'onChange'> {
  value?: never
  checkedValue: T
  uncheckedValue: T
  onChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void
}

interface CheckboxP2Props<T = boolean>
  extends Omit<CheckboxCoreProps<T>, 'onChange'> {
  value?: never
  checkedValue: T
  uncheckedValue?: T
  onChange?: (
    value: T | undefined,
    event: ChangeEvent<HTMLInputElement>,
  ) => void
}

interface CheckboxP3Props<T = boolean>
  extends Omit<CheckboxCoreProps<T>, 'onChange'> {
  value?: never
  checkedValue?: T
  uncheckedValue: T
  onChange?: (
    value: T | undefined,
    event: ChangeEvent<HTMLInputElement>,
  ) => void
}

interface CheckboxP4Props<T = boolean>
  extends Omit<CheckboxCoreProps<T>, 'onChange'> {
  value: T
  onChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void
}

interface CheckboxP5Props<T = boolean>
  extends Omit<CheckboxCoreProps<T>, 'onChange'> {
  value?: never
  checkedValue?: T
  uncheckedValue?: T
  onChange?: (value: undefined, event: ChangeEvent<HTMLInputElement>) => void
}

export interface CheckboxProps<T = boolean>
  extends Omit<CheckboxCoreProps<T>, 'onChange'> {
  value?: T
  checkedValue?: T
  uncheckedValue?: T
  onChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void
}

function Checkbox<T>(props: CheckboxP1Props<T>, ref: CheckboxRef): ReactElement
function Checkbox<T>(props: CheckboxP2Props<T>, ref: CheckboxRef): ReactElement
function Checkbox<T>(props: CheckboxP3Props<T>, ref: CheckboxRef): ReactElement
function Checkbox<T>(props: CheckboxP4Props<T>, ref: CheckboxRef): ReactElement
function Checkbox<T>(
  props: CheckboxP5Props<T>,
  ref: CheckboxRef,
): ReactElement {
  const {
    id: inputId,
    className,
    style,
    disabled = false,
    children,
    defaultChecked = false,

    value,
    checkedValue,
    uncheckedValue,
    onChange,
  } = props as CheckboxProps<T>

  const id = useId(inputId)

  const valueMode = 'value' in props
  const matchValueMode = valueMode
    ? false
    : 'checkedValue' in props && 'uncheckedValue' in props

  const [checked, setChecked] = useControllableValue(props, {
    valuePropName: 'checked',
    defaultValue: matchValueMode ? value === checkedValue : defaultChecked,
    trigger: 'onCheckedChange',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedStatus = e.target.checked
    setChecked(checkedStatus)
    if (valueMode) {
      onChange?.(value as T, e)
    } else {
      onChange?.(checkedStatus ? (checkedValue as T) : (uncheckedValue as T), e)
    }
  }

  return (
    <div
      className={cx('are-checkbox', className, root({ disabled }).className)}
    >
      <div className={cx('are-checkbox-inner', checkboxWrapper().className)}>
        <input
          type="checkbox"
          id={id}
          ref={ref}
          className={cx(
            'are-checkbox-input',
            checkboxInput({ checked, disabled }).className,
          )}
          style={style}
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />
        <CSSMotion
          key="are-checkbox-checked"
          visible={checked}
          motionName={checkedMotion().className}
          forceRender
        >
          {(motion, motionRef) => {
            return (
              <span
                className={cx(
                  motion.className,
                  checkedIconWrapper({ disabled }).className,
                )}
                style={motion.style}
                ref={motionRef}
              >
                <CheckedIcon className={checkedIcon()} />
              </span>
            )
          }}
        </CSSMotion>
      </div>
      <label className={label({ disabled })} htmlFor={id}>
        {children}
      </label>
    </div>
  )
}

interface CheckboxComponent {
  <T = boolean>(
    props: CheckboxP1Props<T> & {
      ref?: ForwardedRef<HTMLInputElement>
    },
  ): ReactElement
  <T = boolean>(
    props: CheckboxP2Props<T> & {
      ref?: ForwardedRef<HTMLInputElement>
    },
  ): ReactElement
  <T = boolean>(
    props: CheckboxP3Props<T> & {
      ref?: ForwardedRef<HTMLInputElement>
    },
  ): ReactElement
  <T = boolean>(
    props: CheckboxP4Props<T> & {
      ref?: ForwardedRef<HTMLInputElement>
    },
  ): ReactElement
  <T = boolean>(
    props: CheckboxP5Props<T> & {
      ref?: ForwardedRef<HTMLInputElement>
    },
  ): ReactElement
}

export default forwardRef(Checkbox) as CheckboxComponent
