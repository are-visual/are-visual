import { ChangeEvent, createContext, useContext } from 'react'

import type { RadioRenderFn } from './interface'

export interface RadioStateShape<T> {
  value?: T
  disabled?: boolean
  name?: string
  onChange?: (value: T, event?: ChangeEvent<HTMLInputElement>) => void
  render?: RadioRenderFn<T>
}

export const RadioState = createContext<RadioStateShape<any> | null>(null)

export const useRadioState = () => {
  return useContext(RadioState)
}
