import type { Omit } from '@are-visual/utils'
import {
  DetailedHTMLFactory,
  DOMAttributes,
  MouseEvent,
  ReactHTML,
} from 'react'

export type DOMEvent<T> = Omit<
  DOMAttributes<T>,
  'children' | 'dangerouslySetInnerHTML'
>

export type ReactHTMLKeys = keyof ReactHTML

/**
 * 获取 ReactHTML 类型
 *
 * type ButtonProps = ReactHTMLProps<ReactHTML['button']>
 */
export type ReactHTMLProps<T> = T extends DetailedHTMLFactory<infer P, infer D>
  ? P
  : never

export type PropsOf<T extends ReactHTMLKeys> = ReactHTMLProps<ReactHTML[T]>

export type ReactHTMLTag<T> = T extends DetailedHTMLFactory<any, infer Tag>
  ? Tag
  : never
export type DOMOf<T extends ReactHTMLKeys> = ReactHTMLTag<ReactHTML[T]>

export type OmitButtonProps<T> = Omit<T, 'type' | 'onClick'>
export type FullNativeButtonProps = PropsOf<'button'>
export type NativeButtonType = NonNullable<FullNativeButtonProps['type']>

/* global globalThis */
export type ButtonEventValue = MouseEvent<
  HTMLButtonElement,
  globalThis.MouseEvent
>

export type NativeButtonClick = NonNullable<FullNativeButtonProps['onClick']>
