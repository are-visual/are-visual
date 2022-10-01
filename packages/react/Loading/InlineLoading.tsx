import './styles/inline-loading.scss'

import { ReactComponent as LoadingIcon } from '@are-visual/resources/loading.svg'
import cx from 'clsx'
import CSSMotion from 'rc-motion'
import type { FC } from 'react'
import { CSSProperties } from 'react'

export interface InlineLoadingProps {
  className?: string
  style?: CSSProperties
  spinning?: boolean
}

const getCollapsedWidth = () => ({
  width: 0,
  opacity: 0,
  transform: 'scale(0)',
})

const getRealWidth = (node: HTMLElement) => {
  return {
    width: node.scrollWidth,
    opacity: 1,
    transform: 'scale(1)',
  }
}

const InlineLoading: FC<InlineLoadingProps> = (props) => {
  const { className, style, spinning } = props

  return (
    <CSSMotion
      visible={spinning}
      removeOnLeave
      motionName="are-inline-loading-motion"
      onAppearStart={getCollapsedWidth}
      onAppearActive={getRealWidth}
      onEnterStart={getCollapsedWidth}
      onEnterActive={getRealWidth}
      onLeaveStart={getRealWidth}
      onLeaveActive={getCollapsedWidth}
    >
      {({ className: loadingClass, style: loadingStyle }, loadingRef) => {
        return (
          <span
            className="are-inline-loading"
            ref={loadingRef}
            style={loadingStyle}
          >
            <span
              className={className}
              style={{ ...style, display: 'inline-block' }}
            >
              <LoadingIcon
                className={cx('are-inline-loading-icon', loadingClass)}
              />
            </span>
          </span>
        )
      }}
    </CSSMotion>
  )
}

export default InlineLoading
