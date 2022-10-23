import { useControllableValue } from '@are-visual/react-hooks'
import React, { ReactElement, ReactNode, useMemo } from 'react'

import { CheckboxCtx, CheckboxCtxShape } from './context'

export interface CheckboxGroupProps<T> {
  /**
   * 指定 `<Checkbox.Group />` 下所有 Checkbox 组件的 input `name` 属性
   */
  name?: string
  /**
   * 禁用所有
   */
  disabled?: boolean
  /**
   * 已选择的选项值
   */
  // eslint-disable-next-line react/no-unused-prop-types
  value?: T[]
  /**
   * 默认选中的选项值
   */
  defaultValue?: T[]
  /**
   * 修改选中的选项值时触发
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onChange?: (value: T[]) => void
  children?: ReactNode
}

function CheckboxGroup<T>(props: CheckboxGroupProps<T>): ReactElement {
  const { children, disabled, name, defaultValue = [] } = props

  const [value, setValue] = useControllableValue<T[]>(props, {
    defaultValue,
  })

  const ctxValue = useMemo<CheckboxCtxShape<T>>(() => {
    const isChecked = (val: T) => {
      return value.includes(val)
    }
    return {
      disabled,
      name,
      isChecked,
      toggleValueChecked(val) {
        if (isChecked(val)) {
          setValue(value.filter((item) => item !== val))
        } else {
          setValue([...value, val])
        }
      },
    }
  }, [disabled, name, setValue, value])

  return (
    <CheckboxCtx.Provider value={ctxValue}>{children}</CheckboxCtx.Provider>
  )
}

export default CheckboxGroup
