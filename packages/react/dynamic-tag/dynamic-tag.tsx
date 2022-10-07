import { createElement, forwardRef } from 'react'

import type { DefaultOverload, DynamicComponent } from './factory'

type DynamicTagComponentType = DynamicComponent<'div', unknown>

const DynamicTagComponent: DynamicTagComponentType = forwardRef<
  HTMLElement,
  DefaultOverload<'div'>
>(function DynamicTag(props, ref) {
  const { renderAs = 'div', ...rest } = props

  return createElement(renderAs, { ...rest, ref })
})

export default DynamicTagComponent
