let container: HTMLDivElement | null = null

function getPortalHosts() {
  if (container) return container
  const node = document.createElement('div')
  node.className = 'are-portal-hosts'
  container = node
  return node
}

export type ValidPortalTarget = HTMLElement | (() => HTMLElement) | string
export type PortalTarget = ValidPortalTarget | null

export default getPortalHosts
