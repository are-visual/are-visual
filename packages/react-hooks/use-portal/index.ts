import { useEffect, useLayoutEffect, useState } from 'react'

import createPortalContainer, {
  ContainerType,
  GetContainer,
  getPortalContainer,
} from './portal'

function usePortal(visible: boolean, getContainer?: GetContainer) {
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

  useLayoutEffect(() => {
    if (!visible || !defaultContainer) return
    if (renderInline || !notContainer) return
    document.body.appendChild(defaultContainer)
  }, [defaultContainer, notContainer, renderInline, visible])

  if (notContainer) return defaultContainer

  return container as ContainerType
}

export type { ContainerType, GetContainer }

export default usePortal
