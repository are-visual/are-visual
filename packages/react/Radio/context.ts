import { ChangeEvent, createContext, useContext } from 'react'

export interface RadioStateShape<T> {
  value?: T
  disabled?: boolean
  name?: string
  onChange?: (value: T, event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioState = createContext<RadioStateShape<any> | null>(null)

export const useRadioState = () => {
  return useContext(RadioState)
}
