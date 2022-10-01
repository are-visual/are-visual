import { createElement, forwardRef } from 'react'

import type { DefaultOverload, DynamicComponent } from './factory'

type DynamicTagComponent = DynamicComponent<'div', unknown>

const DynamicTag: DynamicTagComponent = forwardRef<
  HTMLElement,
  DefaultOverload<'div'>
>((props, ref) => {
  const { renderAs = 'div', ...rest } = props

  return createElement(renderAs, { ...rest, ref })
})

export default DynamicTag
