import { CSSProperties } from 'react'

export interface StyleProps {
  className?: string
  style?: CSSProperties
}

export type PropsWithStyle<T> = T & StyleProps
