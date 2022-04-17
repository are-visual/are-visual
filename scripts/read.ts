import fs from 'fs'
import path from 'path'

import resolveRoot from './utils/dir-path'

const packageJson = (dirName: string) =>
  JSON.parse(
    fs.readFileSync(path.join(dirName, './package.json')).toString('utf-8'),
  )

function readPath(dirPath: string) {
  const result: string[] = []
  const stack: string[] = fs.readdirSync(dirPath)

  while (stack.length > 0) {
    const item = stack.shift()
    const packagePath = path.join(dirPath, item)
    if (fs.statSync(packagePath).isDirectory()) {
      const packageJsonPath = path.join(packagePath, 'package.json')
      if (fs.existsSync(packageJsonPath)) {
        const pkg = packageJson(packagePath)
        if (!pkg.private) {
          result.push(item)
        }
      }
      fs.readdirSync(packagePath).forEach((child) => {
        if (/node_modules|src|.DS_Store/.test(child)) {
          return
        }
        stack.unshift(path.join(item, child))
      })
    }
  }
  return result
}

const targets = readPath(resolveRoot('packages'))

export { targets }
