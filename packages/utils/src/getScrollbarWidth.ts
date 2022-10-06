const getScrollbarWidth = (element: Element) => {
  const doc = element?.ownerDocument || document
  return Math.abs(window.innerWidth - doc.documentElement.clientWidth)
}

export default getScrollbarWidth
