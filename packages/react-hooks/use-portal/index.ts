import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import createPortalContainer, {
  ContainerType,
  GetContainer,
  getPortalContainer,
} from './portal'

interface PortalOptions {
  visible: boolean
  /** 强制渲染 */
  forceRender?: boolean
  /** 使用外部的渲染容器 */
  getContainer?: GetContainer
}

function usePortal(options: PortalOptions) {
  const { visible, forceRender, getContainer } = options

  const [container, setContainer] = useState(() => {
    if (getContainer === undefined) return undefined
    return getPortalContainer(getContainer)
  })

  const renderInline = container === false
  const notContainer = getContainer === undefined

  const [defaultContainer] = useState(() => {
    if (!notContainer) return null
    return createPortalContainer()
  })

  useEffect(() => {
    if (!getContainer) return
    setContainer(getPortalContainer(getContainer) ?? null)
  }, [getContainer])

  const isAppended = useRef(false)
  useLayoutEffect(() => {
    if (isAppended.current) return
    if ((!visible && !forceRender) || !defaultContainer) return
    if (renderInline || !notContainer) return
    isAppended.current = true
    document.body.appendChild(defaultContainer)
  }, [defaultContainer, notContainer, renderInline, visible, forceRender])

  if (notContainer) return defaultContainer

  return container as ContainerType
}

export type { ContainerType, GetContainer }

export default usePortal
