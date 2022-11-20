import './styles/index.scss'

import {
  Check as CheckedIcon,
  Indeterminate as IndeterminateIcon,
} from '@are-visual/icon'
import { useControllableValue, useId } from '@are-visual/react-hooks'
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

import { useCheckboxCtx } from './context'
// import {
//   checkbox,
//   checkboxInner,
//   checkboxInput,
//   checkedIcon,
//   checkedIconWrapper,
//   checkedMotion,
//   label,
// } from './styles'

type NativeProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'value' | 'onChange'
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
    id: idScoped,
    className,
    style,
    disabled: disabledScoped = false,
    children,
    defaultChecked = false,
    name: nameScoped,
    indeterminate = false,
    onCheckedChange: _onCheckedChange,

    value,
    checkedValue,
    uncheckedValue,
    onChange,
    ...rest
  } = props as CheckboxProps<T>

  const ctx = useCheckboxCtx<T>()

  const name = ctx?.name ?? nameScoped
  const disabled = ctx?.disabled ?? disabledScoped

  const id = useId(idScoped)

  const valueMode = 'value' in props
  const matchValueMode = valueMode
    ? false
    : 'checkedValue' in props && 'uncheckedValue' in props

  const [checkedScoped, setChecked] = useControllableValue(props, {
    valuePropName: 'checked',
    defaultValue: matchValueMode ? value === checkedValue : defaultChecked,
    trigger: 'onCheckedChange',
  })

  const checked = valueMode ? ctx?.isChecked(value as T) : checkedScoped
  const isActive = checked || indeterminate

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (valueMode) {
      ctx?.toggleValueChecked(value as T)
      onChange?.(value as T, e)
    } else {
      const checkedStatus = e.target.checked
      setChecked(checkedStatus)
      onChange?.(checkedStatus ? (checkedValue as T) : (uncheckedValue as T), e)
    }
  }

  return (
    <div
      className={cx(
        'are-checkbox',
        { 'are-checkbox-disabled': disabled },
        className,
        // checkbox({ disabled }).className,
      )}
    >
      <div
        className={cx(
          'are-checkbox-inner',
          // checkboxInner().className
        )}
      >
        <input
          {...rest}
          name={name}
          type="checkbox"
          id={id}
          ref={ref}
          className={cx(
            'are-checkbox-input',
            {
              'are-checkbox-input-checked': !disabled && isActive,
              'are-checkbox-input-checked-disabled': disabled && isActive,
              'are-checkbox-input-disabled': disabled,
            },
            // checkboxInput({
            //   checked: !disabled && isActive,
            //   disabled,
            //   checkedDisabled: disabled && isActive,
            // }).className,
          )}
          style={style}
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />
        <CSSMotion
          key="are-checkbox-checked"
          visible={isActive}
          motionName={
            // checkedMotion().className
            'are-checkbox-motion'
          }
          forceRender
        >
          {(motion, motionRef) => {
            return (
              <span
                className={cx(
                  motion.className,
                  'are-checkbox-icon-wrap',
                  // checkedIconWrapper({ disabled }).className,
                )}
                style={motion.style}
                ref={motionRef}
              >
                {checked ? (
                  <CheckedIcon className="are-checkbox-icon" />
                ) : (
                  indeterminate && (
                    <IndeterminateIcon className="are-checkbox-icon" />
                  )
                )}
              </span>
            )
          }}
        </CSSMotion>
      </div>
      <label
        className={cx(
          'are-checkbox-label',
          //  label({ disabled }).className
        )}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  )
}

export interface CheckboxComponent {
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
