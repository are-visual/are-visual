import { DetailedHTMLFactory, ReactHTML } from 'react'

export type ReactHTMLKeys = keyof ReactHTML

/**
 * 获取 ReactHTML 类型
 *
 * type ButtonProps = ReactHTMLProps<ReactHTML['button']>
 */
export type ReactHTMLProps<T> = T extends DetailedHTMLFactory<infer P, infer _D>
  ? P
  : never

export type PropsOf<T extends ReactHTMLKeys> = ReactHTMLProps<ReactHTML[T]>

export type ReactHTMLTag<T> = T extends DetailedHTMLFactory<any, infer Tag>
  ? Tag
  : never
export type DOMOf<T extends ReactHTMLKeys> = ReactHTMLTag<ReactHTML[T]>

export type FullNativeButtonProps = PropsOf<'button'>
export type NativeButtonType = NonNullable<FullNativeButtonProps['type']>

export type NativeButtonClick = NonNullable<FullNativeButtonProps['onClick']>
