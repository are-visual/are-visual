export default function styleInject(css: string) {
  if (!css || typeof document === 'undefined') return
  const style = document.createElement('style')
  style.appendChild(document.createTextNode(css))
  const flag = document.querySelector('meta[name="are-visual-style"]')
  if (flag) {
    const container = flag.parentNode!
    container.insertBefore(style, flag)
  } else {
    const head = document.head || document.getElementsByTagName('head')[0]
    head.appendChild(style)
  }
}
