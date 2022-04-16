/**
 * 获取对象中的值作为类型
 *
 * ```ts
 * type NewType = ValueOf<typeof {A: 0, B: 1}>
 * ```
 */
export type ValueOf<T> = T[keyof T]
