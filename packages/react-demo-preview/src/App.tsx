import '@are-visual/styles/var/default-var.scss'
import '@are-visual/styles/index.scss'

import { css, globalCss } from '@stitches/react'
import { createElement, Suspense } from 'react'
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

const modules = import.meta.globEager('../../react-demo/src/*/*.tsx')

const routes = Object.keys(modules).map((key): RouteObject => {
  const val = key.split('/')
  const moduleName = val[val.length - 2]
  const routeName = val[val.length - 1].replace(/\s/, '-').replace(/.tsx/, '')
  const element = modules[key]

  return {
    path: `/${moduleName}/${routeName}`,
    element: <>{createElement(element.default)}</>,
  }
})

const container = css({
  display: 'flex',
  height: '100%',
})

const sidebar = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 'none',
  width: 200,
  padding: 16,
  borderRight: '1px solid #f1f1f1',
  '& a + a': {
    marginTop: 8,
  },
})

const globalStyles = globalCss({
  'html,body,#root': {
    minHeight: '100%',
    height: '100%',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Helvetica', 'Arial', 'PingFang SC', 'Microsoft YaHei',
    'WenQuanYi Micro Hei', sans-serif`,
  },
  body: {
    margin: 0,
    minHeight: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
})

function Root() {
  globalStyles()

  return (
    <main className={container()}>
      <div className={sidebar()}>
        {routes.map((item) => {
          return (
            <Link key={item.path} to={item.path!}>
              {item.path}
            </Link>
          )
        })}
      </div>
      <div style={{ flexGrow: 1, padding: 16 }}>
        <Outlet />
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
