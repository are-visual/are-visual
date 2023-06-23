import '@are-visual/styles/var/default-var'
import '@are-visual/styles/index'

import { ReactComponent as Logo } from '@are-visual/logo/are-visual.svg'
import clsx from 'clsx'
import { Suspense } from 'react'
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import routes, { sideMenu } from './router'

function Root() {
  return (
    <main className="h-full min-h-full">
      <aside className="border-box fixed top-0 left-0 h-full w-[260px] p-[16px] overflow-y-auto text-[14px] text-[#212121]">
        <a className="flex items-center px-[16px] pt-[14px] pb-[20px]" href="/">
          <Logo className="h-[30px]" />
          <h1 className="ml-[10px] text-[20px] font-semibold">Are Visual</h1>
        </a>
        {sideMenu.map((item) => {
          return (
            <NavLink
              key={item.path}
              className={({ isActive }) => {
                return clsx(
                  'block py-[10px] px-[16px] relative rounded-[6px] leading-none transition-colors',
                  {
                    'hover:bg-gray-100': !isActive,
                    'prefix bg-gray-100': isActive,
                  },
                )
              }}
              to={item.path!}
            >
              {item.title}
            </NavLink>
          )
        })}
      </aside>
      <div className="flex flex-col pl-[260px] h-full min-h-full">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Root />, children: routes },
])

const App = () => {
  return (
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
