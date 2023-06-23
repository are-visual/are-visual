import clsx from 'clsx'
import type { CSSProperties, FC, ReactNode } from 'react'

export interface StageProps {
  className?: string
  wrapClassName?: string
  style?: CSSProperties
  aside?: ReactNode
  children?: ReactNode
}

const Stage: FC<StageProps> = (props) => {
  const { wrapClassName, className, style, aside, children } = props

  return (
    <section
      className={clsx(
        'flex items-start rounded-10 overflow-hidden border border-solid border-[#e9ecef]',
        wrapClassName,
      )}
    >
      <div className={clsx('flex-grow p-16', className)} style={style}>
        {children}
      </div>
      {aside && (
        <aside className="flex flex-col p-16 flex-none w-[250px] space-y-8">
          {aside}
        </aside>
      )}
    </section>
  )
}

export default Stage
