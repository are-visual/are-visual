import { useCallback, useReducer, useRef, useState } from 'react'

export interface ControllableValueOptions<T> {
  defaultValue?: T
  defaultValuePropName?: string
  valuePropName?: string
  trigger?: string
}

export function useControllableValue<T>(
  props: Record<string, any>,
  options?: ControllableValueOptions<T>,
) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options || {}

  const value = props[valuePropName] as T
  const isControlled = valuePropName in props

  const [initialValue] = useState(() => {
    if (isControlled) {
      return value
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName]
    }
    return defaultValue
  })

  const stateRef = useRef<T>(initialValue as T)
  if (isControlled) {
    stateRef.current = value
  }

  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const handle = useRef<(...args: unknown[]) => void>(props[trigger])
  handle.current = props[trigger]

  const setState = useCallback(
    (v: T, ...args: unknown[]) => {
      if (!isControlled) {
        stateRef.current = v
        forceUpdate()
      }
      if (typeof handle.current === 'function') {
        handle.current(v, ...args)
      }
    },
    [isControlled],
  )
  return [stateRef.current, setState] as const
}
