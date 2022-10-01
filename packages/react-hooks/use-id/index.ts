import { useState } from 'react'

import { useIsomorphicEffect } from '../use-isomorphic-effect'

export function randomId() {
  return `are-${Math.random().toString(36).slice(2, 11)}`
}

export function useId(staticId?: string) {
  const [id, setId] = useState('')

  useIsomorphicEffect(() => {
    setId(randomId())
  }, [])

  return staticId || id
}
