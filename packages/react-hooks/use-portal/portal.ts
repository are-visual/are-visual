import canUseDom from 'rc-util/es/Dom/canUseDom'

let container: HTMLDivElement | null = null

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

function createPortalContainer() {
  if (container) return container
  const node = document.createElement('div')
  node.className = 'are-portal-hosts'
  container = node
  return node
}

export default createPortalContainer
