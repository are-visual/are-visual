import { PortalTarget } from '@are-visual/portal-hosts'
import { useIsomorphicEffect as useLayoutEffect } from '@are-visual/react-hooks'
import { isElement } from 'lodash-es'
import { useEffect, useState } from 'react'

interface UseContainerOptions {
  target?: PortalTarget
  /** 创建默认容器 */
  createContainer?: () => HTMLElement
  /** 是否需要将 DOM 渲染至 body，仅对默认容器有效 */
  render?: boolean
}

function useContainer(options: UseContainerOptions) {
  const { target, createContainer, render = false } = options

  const renderInner = target === null
  const [defaultContainer] = useState(() => {
    if (typeof createContainer === 'function') {
      return createContainer()
    }
    return document.createElement('div')
  })
  const [container, setContainer] = useState<HTMLElement>(defaultContainer)

  useEffect(() => {
    if (renderInner) return
    if (isElement(target)) {
      setContainer(target as HTMLElement)
    } else if (typeof target === 'string') {
      const node = document.querySelector<HTMLElement>(target)
      if (!node) {
        throw Error(`Element ${target} not found.`)
      }
      setContainer(node)
    } else if (typeof target === 'function') {
      setContainer(target())
    } else {
      setContainer(defaultContainer)
    }
  }, [defaultContainer, renderInner, target])

  useLayoutEffect(() => {
    if (renderInner || !container || container !== defaultContainer) return

    const remove = () => {
      defaultContainer.parentElement?.removeChild(defaultContainer)
    }

    if (render) {
      document.body.appendChild(defaultContainer)
    } else {
      remove()
    }
    return remove
  }, [container, defaultContainer, renderInner, render])

  if (renderInner) return null
  return container as HTMLElement
}

export default useContainer
