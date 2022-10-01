import './styles/group.scss'

import { useControllableValue } from '@are-visual/react-hooks'
import cx from 'clsx'
import React, { PropsWithChildren, useMemo } from 'react'

import { RadioState, RadioStateShape } from './context'

export type RadioGroupProps<T = string> = RadioStateShape<T> & {
  defaultValue?: T
  /**
   * 排列方向
   *
   * @default "x"
   */
  direction?: 'x' | 'y'
  /**
   * 间距大小
   */
  spacing?: string
}

function RadioGroup<T>(props: PropsWithChildren<RadioGroupProps<T>>) {
  const {
    children,
    name,
    disabled,
    defaultValue,
    direction = 'x',
    spacing,
  } = props

  const [value, onChange] = useControllableValue<T | undefined>(props, {
    defaultValue,
  })

  const state = useMemo<RadioStateShape<T>>(() => {
    return { value, name, disabled, onChange }
  }, [disabled, name, onChange, value])

  return (
    <RadioState.Provider value={state}>
      <div
        className={cx('are-radio-group', {
          'are-radio-group-x': direction === 'x',
          'are-radio-group-y': direction === 'y',
        })}
        style={{
          flexDirection: direction === 'y' ? 'column' : 'row',
          ...(spacing ? { '--are-radio-spacing': spacing } : {}),
        }}
      >
        {children}
      </div>
    </RadioState.Provider>
  )
}

export default RadioGroup
