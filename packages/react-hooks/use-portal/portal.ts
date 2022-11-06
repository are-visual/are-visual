import createPortalContainer from '@are-visual/portal-hosts'
import canUseDom from 'rc-util/es/Dom/canUseDom'

export type ContainerType = Element

export type GetContainer =
  | string
  | ContainerType
  | (() => ContainerType)
  | false

export function getPortalContainer(getContainer: GetContainer) {
  if (getContainer === false) {
    return false
  }

  if (!canUseDom() || !getContainer) return null

  if (typeof getContainer === 'string') {
    return document.querySelector(getContainer)
  }

  if (typeof getContainer === 'function') {
    return getContainer()
  }

  return getContainer
}

export default createPortalContainer
