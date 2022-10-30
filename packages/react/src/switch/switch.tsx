import './styles/index.scss'

import { useControllableValue, useId } from '@are-visual/react-hooks'
import cx from 'clsx'
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from 'react'

type NativeProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'onChange'
>

export type SwitchRef = HTMLInputElement
type SwitchRefShape = ForwardedRef<SwitchRef>

export interface SwitchProps<T = boolean> extends NativeProps {
  /**
   * 开启开关时的值
   *
   * @default true
   */
  checkedValue?: T
  /**
   * 关闭开关时的值
   *
   * @default false
   */
  uncheckedValue?: T
  onChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void
  /**
   * `checked` 值变化时回调
   */
  onCheckedChange?: (checked: boolean) => void
}

function Switch<T = boolean>(
  props: SwitchProps<T>,
  ref: SwitchRefShape,
): ReactElement {
  const {
    id: idScoped,
    className,
    style,

    checkedValue = true,
    uncheckedValue = false,
    defaultChecked = false,
    disabled,
    onChange,
    children,

    // ignore
    onCheckedChange: _onCheckedChange,
    checked: _checked,

    ...rest
  } = props

  const id = useId(idScoped)

  const [checked, setChecked] = useControllableValue<boolean>(props, {
    defaultValue: defaultChecked,
    valuePropName: 'checked',
    trigger: 'onCheckedChange',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    const value = isChecked ? checkedValue : uncheckedValue

    setChecked(isChecked)
    onChange?.(value as T, e)
  }

  return (
    <div className={cx('are-switch', className)} style={style}>
      <div
        className={cx('are-switch-container', {
          'are-switch-checked': checked,
          'are-switch-unchecked': !checked,
          'are-switch-disabled': disabled,
        })}
      >
        <input
          {...rest}
          id={id}
          className={cx('are-switch-input')}
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className={cx('are-switch-indicator')} />
      </div>
      <label
        className={cx('are-switch-label', {
          'are-switch-disabled': disabled,
        })}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  )
}

export default forwardRef(Switch) as <T = boolean>(
  props: SwitchProps<T> & {
    ref?: SwitchRefShape
  },
) => ReactElement
