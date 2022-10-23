import { createContext, useContext } from 'react'

export interface CheckboxCtxShape<T> {
  /**
   * 指定 `<Checkbox.Group />` 下所有 Checkbox 组件的 input `name` 属性
   */
  name?: string
  /**
   * 禁用所有
   */
  disabled?: boolean
  /**
   * 查询某个选项值是否属于已选中状态
   */
  isChecked: (value: T) => boolean
  /**
   * 切换选项值的选中状态
   */
  toggleValueChecked: (value: T) => void
}

const CheckboxCtx = createContext<CheckboxCtxShape<never> | null>(null)

CheckboxCtx.displayName = 'CheckboxCtx'

function useCheckboxCtx<T = unknown>() {
  return useContext(CheckboxCtx) as CheckboxCtxShape<T> | null
}

export { CheckboxCtx, useCheckboxCtx }
