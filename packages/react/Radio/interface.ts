import { ReactElement, ReactNode } from 'react'

export interface RadioRender<T> {
  value: T
  disabled?: boolean
  checked: boolean
  name?: string
  children?: ReactNode
  setActive: () => void
}

export type RadioRenderFn<T> = (options: RadioRender<T>) => ReactElement
