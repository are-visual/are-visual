import { Fragment, ReactElement } from 'react'

export default function isFragment(child: ReactElement) {
  return child && child.type === Fragment
}
