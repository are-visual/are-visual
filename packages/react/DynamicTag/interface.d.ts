import { DetailedHTMLFactory, ReactHTML } from 'react'

export type ReactHTMLKeys = keyof ReactHTML

/**
 * 获取 ReactHTML 类型
 *
 * type ButtonProps = ReactHTMLProps<ReactHTML['button']>
 */
export type ReactHTMLProps<T> = T extends DetailedHTMLFactory<infer P, infer D>
  ? P
  : never

export type HTMLProps<T extends ReactHTMLKeys> = ReactHTMLProps<ReactHTML[T]>

export type ReactHTMLTag<T> = T extends DetailedHTMLFactory<any, infer Tag>
  ? Tag
  : never

export type HTMLRef<T extends ReactHTMLKeys> = ReactHTMLTag<ReactHTML[T]>
