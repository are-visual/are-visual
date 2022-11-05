import React, { ReactNode, useEffect, useState } from 'react'

export interface LazyRenderProps {
  /**
   * 是否渲染
   */
  render?: boolean
  /**
   * 强制渲染 children
   *
   * @default false
   */
  forceRender?: boolean
  /**
   * 关闭时销毁子元素
   *
   * @default false
   */
  destroyable?: boolean
  children?: ReactNode
}

const LazyRender: React.FC<LazyRenderProps> = (props) => {
  const {
    render = false,
    forceRender = false,
    destroyable = false,
    children,
  } = props

  const [visited, setVisited] = useState(forceRender)
  useEffect(() => {
    if (render) {
      setVisited(true)
    } else if (destroyable) {
      setVisited(false)
    }
  }, [render, destroyable])

  // Because children may have multiple elements.
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{(render || visited || forceRender) && children}</>
}

export default LazyRender
