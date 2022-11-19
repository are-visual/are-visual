import clsx from 'clsx'
import { FC, Fragment, ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export interface ContentConfig {
  title: string
  element: ReactNode
}

export interface ContentProps {
  title: string
  contentConfig: ContentConfig[]
}

const Content: FC<ContentProps> = (props) => {
  const { title, contentConfig } = props
  const { hash } = useLocation()

  useEffect(() => {
    document.title = `${title} - Are Visual`
  }, [title])

  return (
    <>
      <header className="pt-[24px] px-[24px]">
        <h2 className="font-bold text-[28px] mb-[10px]">{title}</h2>
      </header>
      <div className="flex items-start px-[24px] pb-[24px]">
        <div className="flex-grow space-y-[18px]">
          {contentConfig.map((item) => {
            const name = item.title
            return (
              <section key={name}>
                <a
                  id={name.toLocaleLowerCase()}
                  className="block indent-[2px] text-[18px] font-bold mb-[10px]"
                  href={`#${name.toLocaleLowerCase()}`}
                >
                  {name}
                </a>
                {item.element}
              </section>
            )
          })}
        </div>
        <aside className="flex-none sticky top-[20px] ml-[16px] w-[200px]">
          {contentConfig.map((item) => {
            const name = item.title.toLocaleLowerCase()
            return (
              <a
                key={item.title}
                className={clsx('block leading-none py-[8px] px-[10px]', {
                  'text-primary font-bold': hash === `#${name}`,
                })}
                href={`#${name}`}
              >
                {name}
              </a>
            )
          })}
        </aside>
      </div>
      <footer className="mt-auto py-[20px] px-[24px] text-center text-gray-400 text-[12px]">
        <p>Are Visual · Made By Y-Hui.</p>
      </footer>
    </>
  )
}

export default Content
