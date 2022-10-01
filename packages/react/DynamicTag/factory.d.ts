import type { Mapping } from '@are-visual/utils'
import { ReactElement, RefAttributes } from 'react'

import type { HTMLProps, HTMLRef, ReactHTMLKeys } from './interface'

export interface DynamicTagProps<T> {
  renderAs: T
}

export type DynamicOverload<T extends ReactHTMLKeys> = Mapping<HTMLProps<T>> &
  RefAttributes<HTMLRef<T>> &
  DynamicTagProps<T>

export type DefaultOverload<T extends ReactHTMLKeys> = HTMLProps<T> &
  Partial<DynamicTagProps<ReactHTMLKeys>> &
  RefAttributes<HTMLRef<T>>

export interface DynamicComponent<DefaultTag extends ReactHTMLKeys, P> {
  <T extends ReactHTMLKeys>(
    props: DynamicOverload<T> & P,
    ref: HTMLRef<T>,
  ): ReactElement | null
  (
    props: DefaultOverload<DefaultTag> & P,
    ref: HTMLRef<DefaultTag>,
  ): ReactElement | null
  displayName?: string | undefined
}
