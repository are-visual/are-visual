/**
 * 从 interface 排除某些选项
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
