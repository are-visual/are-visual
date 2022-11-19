import { upperFirst } from 'lodash-es'
import { createElement } from 'react'
import { NonIndexRouteObject, RouteObject } from 'react-router-dom'

import Content, { ContentConfig } from './components/content'

const routeConfig = import.meta.globEager(
  '../../react-demo/src/*/route.config.ts',
)

export const sideMenu = Object.keys(routeConfig).map((key) => {
  const val = key.split('/')
  const moduleName = val[val.length - 2]
  const element = routeConfig[key]
  return { title: element.default.sideMenuName, path: `/${moduleName}` }
}, {} as Record<string, string>)

const modules = import.meta.globEager('../../react-demo/src/*/*.tsx')

type RouteConfig = Omit<NonIndexRouteObject, 'children'> & {
  children?: (RouteObject & { title: string })[]
}

const rawRoutes = new Map<string, RouteConfig>()
sideMenu.forEach((item) => {
  rawRoutes.set(item.path, {
    path: item.path,
  })
})

const content = Object.keys(modules).reduce((res, key) => {
  const val = key.split('/')
  const moduleName = val[val.length - 2]
  const routeName = val[val.length - 1].replace(/\s/, '-').replace(/.tsx/, '')
  const element = modules[key]

  const target = res[`/${moduleName}`] || []

  target.push({
    title: upperFirst(routeName),
    element: <>{createElement(element.default)}</>,
  })
  res[`/${moduleName}`] = target
  return res
}, {} as Record<string, ContentConfig[]>)

const routes = [...rawRoutes.values()].map((item) => {
  const menu = sideMenu.find((menuItem) => menuItem.path === item.path!)

  return {
    ...item,
    element: (
      <Content title={menu?.title} contentConfig={content[item.path!]} />
    ),
  }
})

export default routes
